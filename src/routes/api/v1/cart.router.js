const express = require('express');
const router = express.Router();
const {getAllCarts, addCart, deleteCart} = require('../../../controllers/cart.controller.js');
const {verifyToken} = require('../../../middleware/verify.middleware');

router.post('/:productId/cart', addCart);     
router.get('/cart', getAllCarts);
router.delete('/cart/:cartId', deleteCart);

module.exports = router; 
