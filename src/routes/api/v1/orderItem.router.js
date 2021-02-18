const express = require('express');
const router = express.Router();
const { postOrderItem } = require('../../../controllers/orderItem.controller.js');

router.post('/:id', postOrderItem);

module.exports = router;