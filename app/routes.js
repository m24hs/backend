const express = require('express');
const routes = express.Router();

// Controllers
const VendasController = require('./controllers/VendasController');
const UserController = require('./controllers/UserController');

// Rotas
routes.get('/',(req, res) => {
    return res.send('');
});

// Serviços
routes.post('/iugu', VendasController.iugu);


routes.post('/users', UserController.store); // Criar

module.exports = routes;