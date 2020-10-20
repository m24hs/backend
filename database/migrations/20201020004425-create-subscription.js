module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Subscriptions", "id_iugu", {
        type: DataTypes.STRING,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Subscriptions", "id_iugu"),
    ]);
  },
};
