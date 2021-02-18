const express = require('express');
const router = express.Router();
const { getOrder} = require('../../../controllers/order.controller.js');

router.get('/', getOrder);

module.exports = router;