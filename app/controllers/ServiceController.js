const { Service } = require("../models");

const {
  formatResponseSequelize,
  formatResponseOk,
  formatResponseError,
  generateUrlName,
} = require("../helpers");

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
    const data = {"title": "ÂSOASDÂSD Gestão Preventiva de Motos", "description": "", "page": "", "price": "50.00", "image": ""};//req.body;
console.log(data);
    try {    
      const responseCreatePlan = await Iugu.createPlan({
        name: data.title,
        price: data.price,
      });

      if (responseCreatePlan.hasOwnProperty("errors")) {
        throw new Error("Não foi possivel cadastrar o plano!");
      }

      // Grava no banco
      const response = await formatResponseSequelize(
        Service.upsert(
          { ...data, url: generateUrlName(data.title), plan: responseCreatePlan.identifier },
          { returning: true }
        )
      );

      return res.json(response);
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }
  },
  async delete(req, res) {
    const id = req.params.id || null;
    
    try {
      if (id === null) 
        throw new Error("ID não encontrado.");

      // Procura
      const service = await Service.findByPk(id);

      // Deleta
      if (service) {
        service.destroy();
      }      
      res.json(formatResponseOk({}));
    } catch (error) {
      return res.json(formatResponseError(error.message));
    }    
  },  
};
