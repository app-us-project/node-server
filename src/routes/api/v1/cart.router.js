const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  addCart,
  deleteCart,
} = require("../../../controllers/cart.controller.js");

router.get("/cart", getAllCarts);
router.post("/:productId/cart", addCart);
router.delete("/cart/:cartId", deleteCart);

module.exports = router;
