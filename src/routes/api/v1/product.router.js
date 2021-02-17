const express = require('express');
const router = express.Router();
const { postProduct, deleteProduct } = require('../../../controllers/product.controller.js');
const upload = require('../../../modules/multer');

router.post('/', upload.single('image'), postProduct); //POST api/product
router.delete('/:id', deleteProduct); //DELETE api/product/:id

module.exports = router;
