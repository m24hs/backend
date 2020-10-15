module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {   
    id_iugu: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    phone_prefix: DataTypes.STRING,
    cpf_cnpj: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    number: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    complement: DataTypes.STRING,    
    motorcycle_category: DataTypes.STRING,    
    motorcycle_year: DataTypes.STRING,    
    motorcycle_placa: DataTypes.STRING,    
    motorcycle_renavam: DataTypes.STRING,    
  });

  return User;
};
