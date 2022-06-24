const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

// dbConfig.database,
// dbConfig.username,
// dbConfig.password,
// {
//   host: dbConfig.host,
//   port: dbConfig.port,
//   dialect: dbConfig.dialect,
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
  // the application is executed on Heroku ... use the postgres         database
  sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "<heroku host>",
    logging: true, //false
  });
} else {
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      port: dbConfig.port,

      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    }
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected To Database..");
  })
  .catch((err) => {
    console.error("Error:-", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.products = require("./productModel.js")(sequelize, DataTypes);
// db.reviews = require("./reviewModel.js")(sequelize, DataTypes);

db.carts = require("./cart.model.js")(sequelize, DataTypes);
db.coupons = require("./coupon.model")(sequelize, DataTypes);

//Prevents Auto Table Creation.
db.sequelize.sync({ force: false }).then(() => {
  console.log("Re-Sync Done");
});

//ONE to MANY Relation
// db.products.hasMany(db.reviews, {
//   foreignKey: "product_id",
//   as: "review",
// });

// db.reviews.belongsTo(db.products, {
//   foreignKey: "product_id",
//   as: "product",
// });

module.exports = db;
