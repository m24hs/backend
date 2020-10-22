module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Settings", "partners", {
        type: DataTypes.TEXT("medium"),
      }), 
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Settings", "partners"),
    ]);
  },
};
