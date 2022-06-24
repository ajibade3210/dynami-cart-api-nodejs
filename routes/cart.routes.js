const cartController = require("../controllers/cart.controller");

const router = require("express").Router();

//CartItems
router.post("/save", cartController.addCartItem);
router.get("/", cartController.getAllCartItems);
router.delete("/:id", cartController.deleteCartItem);

//Make Order With Coupon
router.post("/coupon", cartController.addCartCoupon);

module.exports = router;
