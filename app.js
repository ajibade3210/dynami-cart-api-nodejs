const express = require("express");
const cors = require("cors");
const router = require("./routes/cart.routes");
const couponRouter = require("./routes/coupon.routes");

const app = express();

const corOptions = {
  origin: "https://localhost:8081",
};

//MIDDLEWARES
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/carts", router);
app.use("/api/coupons", couponRouter);

app.get("/", (req, res) => {
  res.json({ message: "Cart API" });
});

module.exports = app;
