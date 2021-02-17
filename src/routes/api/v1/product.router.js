const express = require('express');
const router = express.Router();
const { postProduct, deleteProduct, getAllProduct, updateProduct, getProduct } = require('../../../controllers/product.controller.js');
const upload = require('../../../modules/multer');

router.post('/', upload.single('image'), postProduct); //POST api/product
router.delete('/:id', deleteProduct); //DELETE api/product/:id
router.get('/', getAllProduct); //GET api/product
router.put('/:id', updateProduct); //PUT api/product/:id
router.get('/:id', getProduct); //GET api/product/:id

module.exports = router;
