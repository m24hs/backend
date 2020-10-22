module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Partners", "createdAt", {
        allowNull: false,
        type: DataTypes.DATE,
      }),
      queryInterface.addColumn("Partners", "updatedAt", {
        type: DataTypes.DATE,
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Partners", "createdAt"),
      queryInterface.removeColumn("Partners", "updatedAt"),
    ]);
  },
};
