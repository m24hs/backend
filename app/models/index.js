const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/database");
const db = {};

sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  define: {
    charset: "utf8",
    collate: "utf8_general_ci",
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/*
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Relacionamentos
db.user = require('./user.js')(sequelize, Sequelize);;
db.subscription = require('./subscription.js')(sequelize, Sequelize);;

db.user.hasOne(db.subscription, {foreignKey: 'user'});
//db.user.hasOne(db.subscription, {foreignKey: 'user', targetKey: 'id'});
*/

module.exports = db;
