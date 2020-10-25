const express = require("express");
const routes = express.Router();

// Controllers
const UserController = require("./controllers/UserController");
const ServiceController = require("./controllers/ServiceController");
const SubscriptionController = require("./controllers/SubscriptionController");
const PartnersController = require("./controllers/PartnersController");
const PostsController = require("./controllers/PostsController");
const SettingsController = require("./controllers/SettingsController");
const ContactController = require("./controllers/ContactController");

// Rotas
routes.get("/", (req, res) => {
  return res.send("");
});

// Usuários
routes.get("/users/:id?", UserController.index);
routes.post("/users", UserController.store);

// Serviços
routes.get("/services/:id?", ServiceController.index);
routes.post("/services", ServiceController.store);
routes.delete("/services/:id?", ServiceController.delete);

// Assinaturas
routes.get("/subscriptions/:id?", SubscriptionController.index);
routes.post("/subscriptions/:user/:type", SubscriptionController.store);

// Parceiros
routes.get("/partners/:id?", PartnersController.index);
routes.post("/partners", PartnersController.store);
routes.delete("/partners/:id?", PartnersController.delete);

// Dicas
routes.get("/posts/:id?", PostsController.index);
routes.post("/posts", PostsController.store);
routes.delete("/posts/:id?", PostsController.delete);

// Configurações
routes.get("/settings", SettingsController.index);
routes.post("/settings", SettingsController.store);

// Contato
routes.post("/contact", ContactController.store);

module.exports = routes;
