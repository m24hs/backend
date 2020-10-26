module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Settings", "iugu_test", {
        type: DataTypes.BOOLEAN,
      }), 
      queryInterface.addColumn("Settings", "iugu_token_production", {
        type: DataTypes.STRING,
      }), 
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Settings", "iugu_test"),
      queryInterface.removeColumn("Settings", "iugu_token_production"),
    ]);
  },
};
