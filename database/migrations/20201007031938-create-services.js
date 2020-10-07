module.exports = {
  up(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.addColumn("Services", "contract", {
        allowNull: false,
        type: DataTypes.TEXT("medium"),
      }),
      queryInterface.changeColumn("Services", "image", {
        type: DataTypes.TEXT("medium"),
      }),
    ]);
  },

  down(queryInterface, DataTypes) {
    return Promise.all([
      queryInterface.removeColumn("Services", "contract"),
      queryInterface.changeColumn("Services", "image", {
        type: DataTypes.STRING,
      }),
    ]);
  },
};
