const express = require('express');
const router = express.Router();
const { getOrder, getAllOrders, getEntirePrice, confirmOrder} = require('../../../controllers/order.controller.js');

router.get('/', getOrder);      //query userID=""
router.get('/:id', getAllOrders);
router.get('/price/:id', getEntirePrice);
router.get('/confirm/:id', confirmOrder);

module.exports = router;