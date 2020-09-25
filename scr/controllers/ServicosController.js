const axios = require('axios');
const Servicos = require('../models/Servicos');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Servicos.find(data);
            // Error
        } catch (e) {
            result.error = e.message;
            // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {
        // Dados requisição
        const data = req.body;
        const { titulo } = data;

        // Tenta
        let result = {};
        try {
        // Atualiza/Grava
            await Servicos.findOneAndUpdate({ titulo }, data, { upsert: true, new: true, useFindAndModify: false }, (error, doc) => {
                return res.json(doc);
            });
        // Error
        } catch (e) {
            result.error = e.message;
            return res.json(result);
        }
    }
};