module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("Service", {   
    title: DataTypes.STRING,   
    url: DataTypes.STRING,    
    image: DataTypes.TEXT("medium"),    
    contract: DataTypes.TEXT("medium"),    
    description: DataTypes.TEXT,    
    page: DataTypes.TEXT,    
    plan: DataTypes.STRING,    
    price: DataTypes.FLOAT,
  });

  return Service;
};
