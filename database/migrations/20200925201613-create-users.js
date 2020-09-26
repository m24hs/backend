module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_iugu: {        
        type: DataTypes.STRING,
      },      
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {        
        type: DataTypes.STRING,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone_prefix: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cpf_cnpj: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      zip_code: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      street: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },                                                
      district: {
        allowNull: false,
        type: DataTypes.STRING,
      },                                                
      complement: {        
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
    return queryInterface.dropTable('Users');
  }
};