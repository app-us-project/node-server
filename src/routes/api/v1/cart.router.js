const express = require('express');
const router = express.Router();
const { getAllCarts, postCart, getPrice, deleteCart,} = require('../../../controllers/cart.controller.js');

router.post('/', postCart);      //query userID=""
router.get('/', getAllCarts);
router.get('/price', getPrice);
router.delete('/destroy/:id', deleteCart);

module.exports = router;