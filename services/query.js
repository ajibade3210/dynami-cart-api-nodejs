const db = require("../models");

//Create Main Model
const Cart = db.carts;
const Coupon = db.coupons;

//cartItems.length is greaterthan 50 limit

// @desc   Rules
async function couponFilter(name, priceRange, limit, percentOff, amountOff) {
  let cartItems = await Cart.findAll({});
  let totalPrice = await Cart.sum("price");
  console.log("totalPrice", totalPrice);
  console.log(cartItems.length - 1 + "---", limit);

  if (cartItems.length >= limit) {
    if (totalPrice > priceRange && limit >= 4) {
      console.log("REJECTED10");
      totalPrice = fixed(totalPrice, amountOff);
      totalPrice = percentCalc(totalPrice, percentOff);
      return {
        cartItems,
        message: `${name} Discount Accepted`,
        totalPrice,
      };
    } else if (totalPrice > priceRange && limit >= 3) {
      console.log("MIXED10");
      let fixedNum = fixed(totalPrice, amountOff);
      let couponDiscount = percentCalc(totalPrice, percentOff);

      //couponDiscount Discount is Less === more Discount Rate Than FixedNum
      if (couponDiscount < fixedNum) {
        totalPrice = couponDiscount;
      } else {
        totalPrice = fixedNum;
      }

      return {
        cartItems,
        message: `${name} Discount Accepted`,
        totalPrice,
      };
    } else if (totalPrice > priceRange && limit >= 2) {
      console.log("PERCENT10");
      totalPrice = percentCalc(totalPrice, percentOff);

      return {
        cartItems,
        message: `${name} Discount Accepted`,
        totalPrice,
      };
    } else if (totalPrice > priceRange && limit >= 1) {
      console.log("FIXED10");
      totalPrice = fixed(totalPrice, amountOff);
      return {
        cartItems,
        message: `${name} Discount Accepted`,
        totalPrice,
      };
    }
  } else {
    console.log("No Coupon");
    return {
      cartItems,
      message: "Cart Size Not Eligible For This Discount",
      totalPrice,
    };
  }
}

// @desc   Discount TYpes

function percentCalc(totalPrice, percentOff) {
  // Answer = (Number * Percentage) / 100
  // Number - Answer = PercentageOff
  let couponDiscount = (totalPrice * percentOff) / 100;
  totalPrice = Math.floor(totalPrice - couponDiscount);
  return totalPrice;
}

function fixed(totalPrice, amountOff) {
  totalPrice = totalPrice - amountOff;
  return totalPrice;
}

module.exports = {
  couponFilter,
};
