const express = require('express');
const router = express.Router();
const productRouter = require('./product.router');
const imageRouter = require('./image.router');

router.use('/product', productRouter);
router.use('/product', imageRouter);

module.exports = router;
