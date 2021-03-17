const express = require('express');
const router = express.Router();
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const wishListRouter = require('./wishList.router');
const cartRouter = require('./cart.router');
const {verifyToken} = require('../../../middleware/verify.middleware');

router.use('/', verifyToken, cartRouter);
router.use('/product', productRouter);
router.use('/product', imageRouter);
router.use('/', verifyToken, wishListRouter);

module.exports = router;
