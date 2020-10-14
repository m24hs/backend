module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },          
      title: {          
        type: DataTypes.STRING,
      },      
      url: {          
        type: DataTypes.STRING,
      }, 
      image: {          
        type: DataTypes.STRING,
      }, 
      description: {          
        type: DataTypes.TEXT,
      }, 
      page: {          
        type: DataTypes.TEXT,
      },       
      plan: {          
        type: DataTypes.STRING,
      },       
      price: {          
        type: DataTypes.FLOAT,
        defaultValue: 0.00,        
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
    return queryInterface.dropTable('Services');
  }
};