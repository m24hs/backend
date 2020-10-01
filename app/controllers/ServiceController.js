const { Service } = require("../models");

const { formatResponseSequelize } = require("../helpers");

const Iugu = require("../services/Iugu");

module.exports = {
  async index(req, res) {
    const services = await Service.findAll();
    res.json(services);
  },
  async store(req, res) {  
    // Grava usuário no banco
    const response = await formatResponseSequelize(
      Service.create(req.body)
    );

    // Retorna
    return res.json(response);
  },
};
