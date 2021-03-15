const Product = require('../models/product');
const Image = require('../models/image');
const Cart = require('../models/cart');

const addCart = async(req, res, next) => {
  try {
    const productId = req.params.productId;
    const auth = req.headers.authentication;
    const quantity = req.body.quantity;
    const product = await Product.findByPk(productId);
    const image = await Image.findOne({
      where: {ProductId: productId},
    })
    let priceTemp = quantity * product.price;
    const cart = await Cart.create({
      title : product.title,
      userId: auth,
      price : product.price,
      totalPrice : priceTemp,
      quantity: quantity,
      ProductId: productId,
      ImageId: image.id 
  });
  res.json({data: cart});
  } catch (error) {
    console.error(error);
    next(error);
  }
} 

const getAllCarts = async(req, res, next) => {
  try {
    const auth = req.headers.authentication;
    if(!auth){
      throw Error('auth failed');
    }
    const cart = await Cart.findAll({
      where: {userId: auth}
    })
    res.json({data: cart, "allTotalPrice": allTotalPrice});    
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {addCart, getAllCarts};
