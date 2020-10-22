const express = require("express");
const routes = express.Router();

// Controllers
const VendasController = require("./controllers/VendasController");
const UserController = require("./controllers/UserController");
const ServiceController = require("./controllers/ServiceController");
const SubscriptionController = require("./controllers/SubscriptionController");
const PartnersController = require("./controllers/PartnersController");
const SettingsController = require("./controllers/SettingsController");
const ContactController = require("./controllers/ContactController");

// Rotas
routes.get("/", (req, res) => {
  return res.send("");
});

// Serviços
routes.post("/iugu", VendasController.iugu);

// Criar
routes.get("/users/:id?", UserController.index);
routes.post("/users", UserController.store);

routes.get("/services/:id?", ServiceController.index);
routes.post("/services", ServiceController.store);
routes.delete("/services/:id?", ServiceController.delete);

routes.get("/subscriptions/:id?", SubscriptionController.index);
routes.post("/subscriptions/:user/:type", SubscriptionController.store);

routes.get("/partners/:id?", PartnersController.index);
routes.post("/partners", PartnersController.store);
routes.delete("/partners/:id?", PartnersController.delete);

routes.get("/settings", SettingsController.index);
routes.post("/settings", SettingsController.store);

routes.post("/contact", ContactController.store);

module.exports = routes;
