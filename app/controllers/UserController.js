const { User } = require("../models");

const Iugu = require("../services/Iugu");

module.exports = {
  async store(req, res) {
    User.create(req.body)
      .then((item) => {
        res.json({
          status: "success",
          data: item,
        });
      })
      .catch((err) => {
        res.json({
          status: "error",
          data: err,
        });
      });
  },
};
