"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

//#region Sequelize Connection Object
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}
//#endregion

//#region Sequelize Sync
/**
 * { force: false } this option is Danger
 * if you will pass in Brackets of sync funtion
 * it will recreate the whole database with you defination in models
 * and you will loose the present Data
 * */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`);
  })
  .catch((err) => {
    console.log("Database failed To create!");
    console.log(err);
  });
//#endregion

//#region Sequelize Authentication
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => {
    console.log("Connection Failed to established", err);
  });
//#endregion

//#region Compiling Models Classes
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
//#endregion

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
