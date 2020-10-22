module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Partners", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Partners");
  },
};
