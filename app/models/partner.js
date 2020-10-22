module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define("Partner", {   
    name: DataTypes.STRING,   
    image: DataTypes.STRING,   
  });

  return Partner;
};
