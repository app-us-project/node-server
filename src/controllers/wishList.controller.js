const Product = require('../models/product');
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

const getAllWishList = async(req, res, next) => {
  try {
    const wishList = await WishList.findAll({
      where: {userId: req.headers.authentication},
      attributes: ['id', 'ImageId'],
      include: [{
        model: Product, 
        attributes: ['id', 'title', 'price']
      }], 
    });
    if(!wishList){
      throw Error("상품이 없습니다");
    }
    res.json({data: wishList});
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteWishList = async(req, res, next) => {
  try {
    const wishListId = req.params.wishListId;
    const auth = req.headers.authentication;
    await WishList.destroy({
      where: {
        id: wishListId,
        userId: auth
      }
    })
    const wishList = await WishList.findAll({
      attributes: ['id', 'userId', 'ImageId'],
      include: [{
        model: Product,
        attributes: ['id', 'title', 'price']
      }]
    });
    res.json({data: wishList});
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {addWishList, getAllWishList, deleteWishList};
