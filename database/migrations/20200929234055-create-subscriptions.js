module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }  
      },              
      payment_method: {  
        allowNull: false,      
        type: DataTypes.STRING,
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
    return queryInterface.dropTable('Subscriptions');
  }
};