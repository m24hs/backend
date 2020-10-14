module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Settings", "iugu_token", {
        type: DataTypes.STRING,
      }),
      queryInterface.addColumn("Settings", "iugu_account_id", {
        type: DataTypes.STRING,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Settings", "iugu_token"),
      queryInterface.removeColumn("Settings", "iugu_account_id"),
    ]);
  },
};
