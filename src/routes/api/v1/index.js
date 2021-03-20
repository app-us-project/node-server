const express = require('express');
const router = express.Router();

const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const wishListRouter = require('./wishList.router');
const cartRouter = require('./cart.router');
const orderItemRouter = require('./orderItem.router');
const orderRouter = require('./order.router');
const {verifyToken} = require('../../../middleware/verify.middleware');

router.use('/', verifyToken, cartRouter);
router.use('/', verifyToken, wishListRouter);
router.use('/product', productRouter);
router.use('/product', imageRouter);
router.use('/order', verifyToken, orderRouter);
router.use('/orderItem', verifyToken, orderItemRouter);

module.exports = router;
