const { Settings } = require("../models");

const { formatResponseSequelize, formatResponseError } = require("../helpers");

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
    const { service } = req.query;
    const formData = req.body;

    try {
      // Busca plano no db
      const services = await Service.findOne({
        where: {
          url: service,
        },
      });

      if (!services) throw new Error("Serviço não encontrado, contate o suporte!");

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

      if (type === "credit_card") {
        // Cria token de pagamento
        const responsePaymentToken = await Iugu.createPaymentToken(formData);

        if (responsePaymentToken.hasOwnProperty("errors")) {
          const errors = responsePaymentToken.errors;
          if (errors.first_name) {
            throw new Error("Nome do titular inválido!");
          } else if (errors.number) {
            throw new Error("Número do cartão inválido!");
          }
          throw new Error("Erro na geração do token!");
          console.log(errors);
        }

        // Cria forma de pagamento
        const token = responsePaymentToken.id;
        const description = responsePaymentToken.extra_info.display_number;
        const responsePaymentMethod = await Iugu.createPaymentMethod({
          user,
          token,
          description,
        });

        if (responsePaymentMethod.hasOwnProperty("errors"))
          throw new Error("Não foi possivel concluir o pagamento!");
      }

      // Cria assinatura
      const responseSubscription = await Iugu.createSubscription({
        user,
        plan: services.plan,
        payable_with: type,
      });

      // Verifica se deu certo com a cobrança
      if (responseSubscription.hasOwnProperty("errors"))
        throw new Error("Falha na cobrança, verifique seus dados e tente novamente!")

      res.json({ status: "success", data: responseSubscription });
    } catch (error) {
      res.json(formatResponseError(error.message));
    }
  },
};
