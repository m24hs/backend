module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {   
    name: DataTypes.STRING,   
    url: DataTypes.STRING,    
    image: DataTypes.STRING,    
    description: DataTypes.STRING,    
    plan: DataTypes.STRING,    
    price: DataTypes.FLOAT,
  });

  return Service;
};
