module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    iugu_token: DataTypes.STRING,
    iugu_account_id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_pass: DataTypes.STRING,
    email_server: DataTypes.STRING,
    email_port: DataTypes.STRING,
  });

  return Settings;
};