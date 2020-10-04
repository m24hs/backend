const { Subscription, User } = require("../models");

const { formatResponseSequelize } = require("../helpers");

const Iugu = require("../services/Iugu");

module.exports = {
  async index(req, res) {
    // Id
    const id = req.params.id || null;

    // Consulta
    const join = [
      {
        model: User,
        required: true,
      },
    ];
    let subscription = {};
    if (id !== null) {
      subscription = await Subscription.findByPk(id, {
        include: join,
      });
    } else {
      subscription = await Subscription.findAll({
        include: join,
      });
    }
    res.json(subscription || {});
  },
  async store(req, res) {
    // Variáveis auxiliares
    const { user, type } = req.params;
    const plan = "mensal";

    // Usuário banco
    const userDB = await User.findAll({
      where: {
        id_iugu: user,
      },
    });

    // Grava
    const response = await formatResponseSequelize(
      Subscription.create({
        user: userDB[0].dataValues.id,
        payment_method: type,
      })
    );

    if (type === "credit-card") {
      // Cria token de pagamento
      const responsePaymentToken = await Iugu.createPaymentToken();

      // Cria forma de pagamento
      const token = responsePaymentToken.id;
      const description = responsePaymentToken.extra_info.display_number;
      const responsePaymentMethod = await Iugu.createPaymentMethod({
        user,
        token,
        description,
      });
    }

    // Cria assinatura
    const payable_with = type === "credit-card" ? "credit_card" : "bank_slip";
    const responseSubscription = await Iugu.createSubscription({
      user,
      plan,
      payable_with,
    });

    res.json({ status: "success", data: responseSubscription });
  },
};
