const { Service } = require("../models");

const { formatResponseSequelize } = require("../helpers");

const Iugu = require("../services/Iugu");

module.exports = {
  async index(req, res) {    
    // Id
    const id = req.params.id || null;
    const where = req.query.where || null;
    
    // Consulta
    let services = {};
    if (where === "url") {
      services = await Service.findOne({
        where: {
          url: id,
        },
      });
    } else if (id !== null) {
      services = await Service.findByPk(id);
    } else {
      services = await Service.findAll();
    }
    res.json(services || {});
  },
  async store(req, res) {  
    // Grava no banco
    const response = await formatResponseSequelize(Service.upsert(
      req.body, 
      { returning: true } 
    ));
    /*
    const response = await formatResponseSequelize(
      Service.create(req.body)
    );
    */

    // Retorna
    return res.json(response);
  },
};
