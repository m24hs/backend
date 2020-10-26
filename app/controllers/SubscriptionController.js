// Models
const { User, Subscription, Service } = require("../models");

// Auxiliares
const { formatResponseError } = require("../helpers");
const Iugu = require("../services/Iugu");
const moment = require("moment");

module.exports = {
  async index(req, res) {
    // Id
    const id = req.params.id || null;
    const where = req.query.where || null;

    // Consulta
    const join = [
      {
        model: User,
        right: true,
      },
      {
        model: Service,
        require: true,
      },
    ];

    // Consulta
    let subscription = {};

    // Se for passado pela iugu
    if (where === "iugu") {
      subscription = await Subscription.findOne({
        include: [
          {
            model: User,
            require: true,
            where: { id_iugu: id },
          },
          {
            model: Service,
            require: true,
            attributes: ["title", "url"],
          },
        ],
      });
      // Se não encontrar
      if (!subscription) {
        const users = await User.findOne({
          where: {
            id_iugu: id,
          },
        });
        subscription = { User: users };
      }
      subscription = formatResponseIndex(subscription);
      // Id usuário
    } else if (id !== null) {
      subscription = await Subscription.findByPk(id, {
        include: join,
      });
      subscription = formatResponseIndex(subscription);
      // Alterar
    } else {
      subscription = await Subscription.findAll({
        include: join,
      });
      // Trata retorno
      subscription = subscription.map((item) => {
        return formatResponseIndex(item);
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
      // Usuário banco
      const responseUser = await User.findOne({
        where: {
          id_iugu: user,
        },
      });

      if (!responseUser)
        throw new Error("Usuário não encontrado, contate o suporte!");

      // Procura assinatura no banco
      const subscription = await Subscription.findOne({
        where: {
          user: responseUser.id,
        },
      });

      // Verifica assinatura
      if (!subscription)
        throw new Error("Usuário não encontrado, contate o suporte!");

      // Atualiza
      const responseUpdate = await subscription.update(
        {
          payment_method: type,
        },
        { returning: true }
      );

      // Erro
      if (!responseUpdate)
        throw new Error("Erro na gravação, contate o suporte!");

      // Busca plano no db
      const services = await Service.findByPk(responseUpdate.service);

      // Verifica serviços
      if (!services)
        throw new Error("Serviço não encontrado, contate o suporte!");

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

      // Tenta 3x
      let responseSubscription = {};
      const forLoop = async (_) => {
        for (let index = 1; index <= 3; index++) {
          // Cria assinatura
          responseSubscription = await Iugu.createSubscription({
            user,
            plan: services.plan,
            payable_with: type,
          });

          // Verifica se deu certo com a cobrança
          if (responseSubscription.hasOwnProperty("errors")) {
            if (index === 3) {
              throw new Error(
                "Falha na cobrança, verifique seus dados e tente novamente!"
              );
            }
          } else {
            if (
              responseSubscription.hasOwnProperty("id") &&
              responseSubscription.id !== ""
            ) {
              break;
            }
          }
        }
      };
      await forLoop();
      console.log(responseSubscription);
      await subscription.update({
        id_iugu: responseSubscription.id,
      });

      res.json({ status: "success", data: responseSubscription });
    } catch (error) {
      res.json(formatResponseError(error.message));
    }
  },
};

// Formata o retorno
const formatResponseIndex = (item) => {
  item = item.dataValues;
  item.payment_method =
    item.payment_method === "credit_card"
      ? "Cartão de Crédito"
      : item.payment_method === "bank_slip"
      ? "Boleto"
      : "";
  item.updatedAt = moment(item.updatedAt).format("DD/MM/YYYY HH:mm:ss");
  item.status = item.payment_method === "" ? "Incompleta" : "Gerada";
  return item;
};
