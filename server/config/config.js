const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "../.env" });
const Sequelize = require("sequelize");

const options = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    port: process.env.DB_PORT
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};

const currentEnvironment = options[process.env.NODE_ENV];

const sequelize = new Sequelize(
  currentEnvironment.database,
  currentEnvironment.username,
  currentEnvironment.password,
  {
    host: currentEnvironment.host,
    dialect: "postgres",
    port: currentEnvironment.port || 5432
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = options;
