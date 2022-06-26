require("dotenv").config();

module.exports = {
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
