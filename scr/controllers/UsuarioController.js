const axios = require('axios');
const Usuario = require('../models/Usuario');

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Usuario.find(data);
        // Error
        } catch (e) {
            result.error = e.message;
        // Return
        } finally {
            return res.json(result);
        }
    },
    async store(req, res) {
        // Recebe o usuário
        const data = req.body;
        const { email } = data;

        // Tenta
        let result = {};
        try {
        // Atualiza/Grava
            await Usuario.findOneAndUpdate({ email }, data, { upsert: true, new: true, useFindAndModify: false }, (error, doc) => {
                return res.json(doc);
            });         
        // Error
        } catch (e) {
            result.error = e.message;
            return res.json(result);         
        }
    }
};