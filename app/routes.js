const express = require('express');
const routes = express.Router();

// Controllers
const VendasController = require('./controllers/VendasController');
const UserController = require('./controllers/UserController');
const SubscriptionController = require('./controllers/SubscriptionController');

// Rotas
routes.get('/',(req, res) => {
    return res.send('');
});

// Serviços
routes.post('/iugu', VendasController.iugu);

// Criar
routes.post('/users', UserController.store); 

routes.post('/subscription', SubscriptionController.store); 

module.exports = routes;