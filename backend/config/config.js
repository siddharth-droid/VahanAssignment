const Sequelize = require("sequelize");

const sequelize = new Sequelize("CRUD_DB", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
