const express = require('express');
const router = express.Router();
const { postProduct, deleteProduct } = require('../../../controllers/product.controller');
const { upload } = require('../../../service/upload.service');

router.route('/').post(upload.single('imgFile'), postProduct); //POST api/product
router.delete('/:id', deleteProduct); //DELETE api/product/:id

module.exports = router;
