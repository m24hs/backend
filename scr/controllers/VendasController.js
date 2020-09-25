const axios = require('axios');

// Models
const Order = require('../models/Vendas');
const User = require('../models/Usuario');

// Seviços
const { checkErrors } = require('../helpers')

module.exports = {
    async index(req, res) {
        // Dados
        const data = req.query;

        // Try
        let result = {};
        try {
            // Busca no db
            result = await Order.find(data);
            // Error
        } catch (e) {
            result.error = e.message;
            // Return
        } finally {
            return res.json(result);
        }
    },
    async create(req, res) {
        // Cria compra no mercado pago
        const response = await MercadoPago.checkout(req.body);
        res.json(response);
    },
    async store(req, res) {
        // Dados requisição
        const { _id, ...data} = req.body;

        // Tenta
        let result = {};
        try {
            // Retorno
            return res.json({
                
            });            
        // Error
        } catch (e) {
            result.error = e.message;
            return res.json(result);
        }
    }
};