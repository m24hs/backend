require("dotenv/config");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const server = express();

// Config
server.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
server.use(express.json({ limit: 1024 * 1024 * 20, type: "application/json" }));
server.use(routes);
server.use("/uploads", express.static(process.cwd() + "/uploads"));

// Start
server.listen(process.env.PORT || 3333);
