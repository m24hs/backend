const express = require('express');
const routes = express.Router();

// Controllers
const VendasController = require('./controllers/VendasController');

// Rotas
routes.get('/',(req, res) => {
    return res.send('');
});

// Serviços
routes.post('/iugu', VendasController.iugu);

module.exports = routes;