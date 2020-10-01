module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {   
    name: DataTypes.STRING,   
    url: DataTypes.STRING,    
    image: DataTypes.STRING,    
    description: DataTypes.TEXT,    
    description: DataTypes.TEXT,    
    plan: DataTypes.STRING,    
    price: DataTypes.FLOAT,
  });

  return Service;
};
