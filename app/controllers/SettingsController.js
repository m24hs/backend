// Models
const { Settings } = require("../models");

// Auxiliares
const { formatResponseSequelize, formatResponseError } = require("../helpers");

module.exports = {
  async index(req, res) {
    const columns = req.query.columns || null;

    const settings = await Settings.findOne({
      attributes: columns,
    });
    res.json(settings || {});
  },
  async store(req, res) {
    const formData = req.body;

    try {
      // Grava no banco
      const response = await formatResponseSequelize(
        Settings.upsert(formData, { returning: true })
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
