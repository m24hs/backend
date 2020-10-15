const { Op } = require("sequelize");
const { User } = require("../models");

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
      const {
        name,
        email,
        phone,
        phone_prefix,
        cpf_cnpj,
        zip_code,
        number,
        street,
        city,
        state,
        district,
        complement,
        origin,
      } = req.body;

      // Verifica se o usuário já é cadastrado
      userData =
        (await User.findOne({
          where: {
            [Op.or]: [
              {
                cpf_cnpj: cpf_cnpj,
              },
              {
                email: email,
              },
            ],
          },
        })) || {};

      // Validação
      if (userData.dataValues) {
        if (userData.dataValues.cpf_cnpj == cpf_cnpj) {
          throw new Error(
            "CPF já cadastrado, favor entrar em contato através do telefone 0800 729 9123."
          );
        } else if (userData.dataValues.email == email) {
            throw new Error(
              "Email já cadastrado, favor entrar em contato através do telefone 0800 729 9123."
            );
        }
      }

      // Cria usuário na Iugu
      const iuguUser = await Iugu.createCustomers({
        name,
        email,
        phone,
        phone_prefix,
        cpf_cnpj,
        zip_code,
        number,
        street,
        city,
        state,
        district,
        complement,
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
        User.create({
          name,
          id_iugu: iuguUser.id,
          email,
          phone,
          phone_prefix,
          cpf_cnpj,
          zip_code,
          number,
          street,
          city,
          state,
          district,
          complement,
        })
      );

      // Se houver erros
      if (response.status === "error") {
        throw new Error("Erro no cadastro, por favor, tente novamente.");
      }

      // Retorna
      return res.json(response);
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }
  },
};
