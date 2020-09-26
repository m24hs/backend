module.exports = {
  formatRequest: async (request) => {
    return await request
      .then(function (item) {
        res.json({
          status: "success",
          data: item,
        });
      })
      .catch(function (err) {
        res.json({
          status: "error",
          data: err,
        });
      });
  },
};
