module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },          
      name: {  
        allowNull: false,      
        type: DataTypes.STRING,
      },      
      url: {  
        allowNull: false,      
        type: DataTypes.STRING,
      }, 
      image: {  
        allowNull: false,      
        type: DataTypes.STRING,
      }, 
      description: {  
        allowNull: false,      
        type: DataTypes.TEXT,
      }, 
      content: {  
        allowNull: false,      
        type: DataTypes.TEXT,
      },       
      plan: {  
        allowNull: false,      
        type: DataTypes.STRING,
      },       
      price: {  
        allowNull: false,      
        type: DataTypes.FLOAT,
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