module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define("Settings", {
    iugu_token: DataTypes.STRING,
    iugu_token_production: DataTypes.STRING,
    iugu_account_id: DataTypes.STRING,
    iugu_test: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    email_pass: DataTypes.STRING,
    email_server: DataTypes.STRING,
    email_port: DataTypes.STRING,
    home: DataTypes.TEXT("medium"),    
    about: DataTypes.TEXT("medium"),    
    contact: DataTypes.TEXT("medium"),    
    partners: DataTypes.TEXT("medium"),    
  });

  return Settings;
};
