module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {   
    user: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
  });

  return Subscription;
};
