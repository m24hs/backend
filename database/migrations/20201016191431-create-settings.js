module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Settings", "home", {
        type: DataTypes.TEXT("medium"),
      }),
      queryInterface.addColumn("Settings", "about", {
        type: DataTypes.TEXT("medium"),
      }),
      queryInterface.addColumn("Settings", "contact", {
        type: DataTypes.TEXT("medium"),
      }),      
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Settings", "home"),
      queryInterface.removeColumn("Settings", "about"),
      queryInterface.removeColumn("Settings", "contact"),
    ]);
  },
};
