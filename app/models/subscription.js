module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    user: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    id_iugu: DataTypes.STRING,
  });

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User, { foreignKey: "user" });
    Subscription.belongsTo(models.Service, { foreignKey: "service" });
  };

  return Subscription;
};
