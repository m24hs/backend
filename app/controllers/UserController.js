// Models
const { User, Service, Subscription } = require("../models");
const { Op } = require("sequelize");

// Auxiliares
const { formatResponseSequelize, formatResponseError } = require("../helpers");
const Iugu = require("../services/Iugu");

module.exports = {
  async index(req, res) {
    // Id
    const id = req.params.id || null;
    const type = req.query.type || null;

    // Consulta
    let users = {};
    if (type !== null) {
      users = await User.findOne({
        where: {
          id_iugu: id,
        },
      });
    } else if (id !== null) {
      users = await User.findByPk(id);
    } else {
      users = await User.findAll();
    }
    res.json(users || {});
  },
  async store(req, res) {
    try {
      // Variáveis auxiliares
      const data = req.body;
      const cep = parseInt(data.zip_code.replace("-",""));

      // Verifica se é permitido nas cidades
      if (
        !(
          cep === 17340000 || // Barra
          cep === 17350000 || // Igaraçu
          (cep >= 17200001 && cep <= 17229999) || // Jau          
          (cep >= 18680000 && cep <= 18689999) || // Lencois          
          (cep >= 17290000 && cep <= 17299999) || // Macatuba      
          (cep >= 17300000 && cep <= 17319999) || // Dois Corregos      
          (cep >= 17280000 && cep <= 17289999)  // Pederneiras
        )
      ) {        
        throw new Error(
          `Ainda não atendemos na sua cidade (${data.city}/${data.state}), entraremos em contato quando nosso serviço estiver disponível na sua região.`
        );
      }

      // Verifica se o usuário já é cadastrado
      userData =
        (await User.findOne({
          where: {
            [Op.or]: [
              {
                cpf_cnpj: data.cpf_cnpj,
              },
              {
                email: data.email,
              },
            ],
          },
        })) || {};

      // Validação
      if (userData.dataValues) {
        if (userData.dataValues.cpf_cnpj == data.cpf_cnpj) {
          throw new Error(
            "CPF já cadastrado, favor entrar em contato através do telefone 0800 729 9123."
          );
        } else if (userData.dataValues.email == data.email) {
          throw new Error(
            "Email já cadastrado, favor entrar em contato através do telefone 0800 729 9123."
          );
        }
      }

      // Cria usuário na Iugu
      const iuguUser = await Iugu.createCustomers({
        name: data.name,
        email: data.email,
        phone: data.phone,
        phone_prefix: data.phone_prefix,
        cpf_cnpj: data.cpf_cnpj,
        zip_code: data.zip_code,
        number: data.number,
        street: data.street,
        city: data.city,
        state: data.state,
        district: data.district,
        complement: data.complement,
      });

      // Se houver erros
      if (iuguUser.hasOwnProperty("errors")) {
        const errors = iuguUser.errors;
        console.log(errors);
        if (errors.phone) {
          throw new Error("O telefone informado não é válido.");
        } else if (errors.zip_code) {
          throw new Error("O CEP informado não é válido.");
        }

        throw new Error("Erro no cadastro, por favor, tente novamente.");
      }

      // Grava usuário no banco
      const response = await formatResponseSequelize(
        User.create({ ...data, id_iugu: iuguUser.id })
      );

      // Se houver erros
      if (response.status === "error") {
        throw new Error("Erro no cadastro, por favor, tente novamente.");
      }

      // Busca serviço no banco
      const responseService = await Service.findOne({
        where: {
          url: data.service_url,
        },
      });

      // Se houver erros
      if (!responseService) {
        throw new Error("Serviço não encontrado, por favor, tente novamente.");
      }

      // Grava assinatura
      const responseSubscription = await formatResponseSequelize(
        Subscription.create({
          user: response.data.id,
          service: responseService.id,
          payment_method: "",
        })
      );

      // Se houver erros
      if (responseSubscription.status === "error") {
        throw new Error("Erro no cadastro, por favor, tente novamente. (2)");
      }

      // Retorna
      return res.json(response);
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }
  },
};
