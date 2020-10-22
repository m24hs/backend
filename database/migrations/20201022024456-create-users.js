module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Users", "origin", {
        type: DataTypes.STRING,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Users", "origin"),
    ]);
  },
};