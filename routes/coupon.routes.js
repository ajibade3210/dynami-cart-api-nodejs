const couponController = require("../controllers/coupon.controller");

const couponRouter = require("express").Router();

//Coupons Creation
couponRouter.post("/save", couponController.addCoupon);
couponRouter.get("/", couponController.getAllCoupons);
couponRouter.delete("/:id", couponController.deleteCoupon);

//Make Order With Coupon

module.exports = couponRouter;
