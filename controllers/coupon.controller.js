const db = require("../models");

//Create Main Model
const Cart = db.carts;
const Coupon = db.coupons;

// @desc   Save Items In Cart
// @route  Post /save
const addCoupon = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      priceRange: req.body.priceRange,
      limit: req.body.limit,
      percentOff: req.body.percentOff,
      amountOff: req.body.amountOff,
    };
    console.log(info);
    const coupon = await Coupon.create(info);
    res.status(200).send(coupon);
    console.log(coupon);
  } catch (err) {
    console.error(err);
  }
};

// @desc   Get All Cart Items
// @route  GET /
const getAllCoupons = async (req, res) => {
  let coupons = await Coupon.findAll({});
  res.status(200).send(coupons);
};

// @desc   Delete Cart Item
// @route  DELETE /:id
const deleteCoupon = async (req, res) => {
  let id = req.params.id;
  await Coupon.destroy({ where: { id: id } });
  res.status(200).send({ message: "Coupon Deleted" });
};

module.exports = {
  addCoupon,
  getAllCoupons,
  deleteCoupon,
};
