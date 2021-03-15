const WishList = require('../models/wishList');
const Image = require("../models/image");

const addWishList = async(req, res, next) => {
  const userId = req.headers.authentication;
  const productId = req.params.productId;
  const {title, price} = req.body;
  try {
    const image = await Image.findOne({
      where: {ProductId: productId},
    })
    const wishList = await WishList.create({
      title: title,
      price: price,
      ProductId: productId,
      userId: userId,
      ImageId: image.id
    });
    res.json({data: wishList});
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {addWishList};
