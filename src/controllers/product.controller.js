const Product = require('../models/product');

const postProduct = async(req, res, next) => {
  try {
    await Product.create({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      imageUrl : '/' + req.file.originalname
    });
    res.status(201).send("Success create product");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const deleteProduct = async(req, res, next) => {
  try {
    await Product.destroy({
      where: {id : req.params.id},
    });
    res.status(201).send("Success delete product");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const getAllProduct = async(req, res, next) => {
  try {
    product = await Product.findAll({ });
    if(!product){
      throw Error('no product');
    }
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const getProduct = async(req, res, next) => {
  try {
    const product = await Product.findOne({where: {id: req.params.id}});
    if(!product){
      throw Error('no product');
    }
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const updateProduct = async(req, res, next) => {
  try {
    const body = req.body;
    const productId = req.params.id;
    await Product.update({
      title: body.title,
      content: body.content,
      price: body.price,
      imageUrl: body.imageUrl
    }, {
      where: {id: productId}
    });
    res.status(200).send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { postProduct, deleteProduct, getAllProduct, updateProduct, getProduct };
