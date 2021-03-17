const Product = require('../models/product');
const Image = require('../models/image');
const Cart = require('../models/cart');
const verifyToken = require('../middleware/verify.middleware');

const addCart = async(req, res, next) => {
  try {
    const productId = req.params.productId;
    const auth = req.auth.id;
    const quantity = req.body.quantity;
    const product = await Product.findByPk(productId);
    const image = await Image.findOne({
      where: {ProductId: productId},
    })
    let priceTemp = quantity * product.price;
    await Cart.create({
      title : product.title,
      userId: auth,
      price : product.price,
      totalPrice : priceTemp,
      quantity: quantity,
      ProductId: productId,
      ImageId: image.id 
  });
  const cart = await Cart.findOne({
    where: {userId: auth, ProductId: productId},
    attributes: [
      'id', 
      'title', 
      'price', 
      'totalPrice', 
      'quantity',
      'ProductId',
      'ImageId' 
    ]
  });
  res.json({data: cart});
  } catch (error) {
    console.error(error);
    next(error);
  }
} 

const getAllCarts = async(req, res, next) => {
  try {
    let auth = req.auth.id;
    if(!auth){
      throw Error('auth failed');
    }
    const cart = await Cart.findAll({
      where: {userId: auth},
      attributes: [
        'id', 
        'title', 
        'price', 
        'totalPrice', 
        'quantity',
        'ProductId',
        'ImageId' 
      ]
    })
    Cart.sum('totalPrice').then(sum => {
      res.json({data: cart, "allTotalPrice": sum}); 
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteCart = async(req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const auth = req.auth.id;
    if(!cartId){
      throw Error('no cartId');
    }
    await Cart.destroy({
      where: {
        id: cartId,
        userId: auth
      }
    });
    const cart = await Cart.findAll({
      attributes: ['id', 'userId', 'totalPrice', 'quantity', 'ImageId'],
      include: [{
        model: Product,
        attributes: ['id', 'title', 'price']
      }]
    })
    res.json({data: cart});
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {addCart, getAllCarts, deleteCart};
