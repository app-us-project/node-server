const express = require('express');
const router = express.Router();
const {getAllCarts, addCart, deleteCart} = require('../../../controllers/cart.controller.js');

router.post('/:productId/cart', addCart);     
router.get('/cart', getAllCarts);
router.delete('/cart/:cartId', deleteCart);

module.exports = router; 
