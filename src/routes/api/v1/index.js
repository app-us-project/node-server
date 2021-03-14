const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const orderItemRouter = require('./orderItem.router');
const orderRouter = require('./order.router');

router.use('/order', orderRouter);
router.use('/orderItem', orderItemRouter);

module.exports = router;
=======
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const wishListRouter = require('./wishList.router');

router.use('/product', productRouter);
router.use('/product', imageRouter);
router.use('/', wishListRouter);

module.exports = router;
>>>>>>> eac178c4e49e775abf3b7a59062b77737e5502c0
