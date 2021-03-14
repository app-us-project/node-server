const express = require('express');
const router = express.Router();
const { postImage, updateImage } = require('../../../controllers/image.controller');
const upload = require('../../../modules/multer');

//관리자
router.post('/:id/image',upload.single('image'), postImage);
router.put('/:id/image/:imageId', upload.single('image'), updateImage);

module.exports = router;