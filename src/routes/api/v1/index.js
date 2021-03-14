const express = require('express');
const router = express.Router();
const orderItemRouter = require('./orderItem.router');
const orderRouter = require('./order.router');

router.use('/order', orderRouter);
router.use('/orderItem', orderItemRouter);

const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const wishListRouter = require('./wishList.router');
const cartRouter = require('./cart.router');

router.use('/product', productRouter);
router.use('/product', imageRouter);
router.use('/cart', cartRouter);
router.use('/', wishListRouter);

module.exports = router;
