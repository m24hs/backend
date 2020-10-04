module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define("Subscription", {
    user: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
  });

  Subscription.associate = (models) => {
    Subscription.belongsTo(models.User, { foreignKey: "user" });
  };

  return Subscription;
};
