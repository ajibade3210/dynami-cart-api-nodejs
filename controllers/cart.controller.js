const db = require("../models");
const { couponFilter } = require("../services/query");

//Create Main Model
const Cart = db.carts;
const Coupon = db.coupons;

// @desc   Save Items In Cart
// @route  Post /save
const addCartItem = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      price: req.body.price,
    };
    console.log(info);
    const cartItem = await Cart.create(info);
    const totalPrice = await Cart.sum("price");
    res.status(200).send({ cartItem, totalPrice: totalPrice });
    console.log({ cartItem, totalPrice: totalPrice });
  } catch (err) {
    console.error(err);
  }
};

// @desc   Get All Cart Items
// @route  GET /
const getAllCartItems = async (req, res) => {
  let cartItems = await Cart.findAll({});
  const totalPrice = await Cart.sum("price");
  res.status(200).send({ cartItems, totalPrice: totalPrice });
};

// @desc   Delete Cart Item
// @route  DELETE /:id
const deleteCartItem = async (req, res) => {
  let id = req.params.id;
  await Cart.destroy({ where: { id: id } });
  res.status(200).send({ message: "Cart Item Iss Deleted" });
};

// @desc   Add Coupon To Total Prices
// @route  POST /coupon
const addCartCoupon = async (req, res) => {
  try {
    const coupon = req.body.coupon;
    let coupons = await Coupon.findOne({ where: { name: coupon } });

    let couponData = await coupons?.toJSON();

    if (!couponData) {
      console.log("No Coupon");
      return await res.send({
        cartItems,
        message: "Not Eligible For Discount",
        totalPrice,
      });
    }

    let { name, priceRange, limit, percentOff, amountOff } = couponData;

    let answer = await couponFilter(
      name,
      priceRange,
      limit,
      percentOff,
      amountOff,
    );
    // console.log(answer);
    return await res.send({
      cartItems: answer.cartItems,
      message: answer.message,
      totalPrice: answer.totalPrice,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  addCartItem,
  getAllCartItems,
  deleteCartItem,
  addCartCoupon,
};
