require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "root",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "item",
  password: process.env.DB_PASSWORD || "password",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
