module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT("medium"),
      },      
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },      
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("Posts");
  },
};
