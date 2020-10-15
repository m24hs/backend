module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Users", "motorcycle_category", {
        type: DataTypes.STRING,
      }),
      queryInterface.addColumn("Users", "motorcycle_year", {
        type: DataTypes.STRING,
      }),
      queryInterface.addColumn("Users", "motorcycle_placa", {
        type: DataTypes.STRING,
      }),
      queryInterface.addColumn("Users", "motorcycle_renavam", {
        type: DataTypes.STRING,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Users", "motorcycle_category"),
      queryInterface.removeColumn("Users", "motorcycle_year"),
      queryInterface.removeColumn("Users", "motorcycle_placa"),
      queryInterface.removeColumn("Users", "motorcycle_renavam"),
    ]);
  },
};