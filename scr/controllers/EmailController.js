const axios = require('axios');
const Mail = require('../models/Email');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Mail.find(data);
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
        const { title } = data;

        // Tenta
        let result = {};
        try {
        // Atualiza/Grava
            await Mail.findOneAndUpdate({ title }, data, { upsert: true, new: true, useFindAndModify: false }, (error, doc) => {
                return res.json(doc);
            });
        // Error
        } catch (e) {
            result.error = e.message;
            return res.json(result);
        }
    }
};