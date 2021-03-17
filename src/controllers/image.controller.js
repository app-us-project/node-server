const Image = require('../models/image');

const postImage = async(req, res, next) => {
  try {
    const product_id = req.params.id;
    if(!product_id){
      throw Error('Invalid params');
    }
    const image = new Image();
    image.ProductId = product_id;
    image.imageUrl = '/'+ req.file.originalname;
    await image.save();
    res.status(201).send("Success save image");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const updateImage = async(req, res, next) => {
  try {
    const productId = req.params.id;
    const imageId = req.params.imageId;
    await Image.update({
      imageUrl: '/' + req.file.originalname
    }, {
      where: {ProductId : productId, id: imageId}
    })
    res.status(201).send("success update image");
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { postImage, updateImage };
