require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST || "ec2-23-23-151-191.compute-1.amazonaws.com",
  username: process.env.DB_USERNAME || "fhshbjfvpagmmh",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "dapug1t2j6cog5",
  password:
    process.env.DB_PASSWORD ||
    "afe2efcc39755c7e40579ac93086d35ba7bb7f8054d98415b1185f3fffff0e6f",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
