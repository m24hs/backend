const express = require('express');
const routes = express.Router();

// Controllers
const ServicosController = require('./controllers/ServicosController');
const UsuarioController = require('./controllers/UsuarioController');
const VendasController = require('./controllers/VendasController');
const EmailController = require('./controllers/EmailController');

// Rotas
routes.get('/',(req, res) => {
    return res.send('');
});


// Serviços
routes.get('/servico', ServicosController.index);
routes.post('/servico', ServicosController.store);

// Usuário
routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);

// Compra
routes.get('/compra', VendasController.index);
routes.post('/compra/checkout', VendasController.create);
routes.post('/compra', VendasController.store);

// Email
routes.get('/email/:param?', EmailController.index);
routes.post('/email', EmailController.store);

module.exports = routes;