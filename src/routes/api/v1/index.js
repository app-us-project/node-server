const express = require('express');
const router = express.Router();
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const wishListRouter = require('./wishList.router');

router.use('/product', productRouter);
router.use('/product', imageRouter);
router.use('/', wishListRouter);

module.exports = router;
