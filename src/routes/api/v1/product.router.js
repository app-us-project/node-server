const express = require('express');
const router = express.Router();
const { postProduct, deleteProduct, getAllProduct, updateProduct, getProduct } = require('../../../controllers/product.controller.js');

// 관리자
router.post('/', postProduct); //POST api/product
router.delete('/:id', deleteProduct); //DELETE api/product/:id
router.put('/:id', updateProduct); //PUT api/product/:id

router.get('/', getAllProduct); //GET api/product
router.get('/:title', getProduct); //GET api/product/:name

module.exports = router;
