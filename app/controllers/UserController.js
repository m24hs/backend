const { User } = require("../models");

const { formatResponse } = require("../helpers")

const Iugu = require("../services/Iugu");

module.exports = {
  async store(req, res) {
    const response = await formatResponse(User.create(req.body));
    console.log(response);
    res.json(response);
  },
};
