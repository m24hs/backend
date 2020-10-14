module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_pass: DataTypes.STRING,
    email_server: DataTypes.STRING,
    email_port: DataTypes.STRING,
  });

  return Settings;
};
