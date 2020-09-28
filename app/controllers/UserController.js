const { User } = require("../models");

const { formatResponseSequelize } = require("../helpers");

const Iugu = require("../services/Iugu");

module.exports = {
  async store(req, res) {
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
      return res.json({ status: "error", data: "Erro no cadastro, por favor, tente novamente." });
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

    // Retorna
    return res.json(response);
  },
};
