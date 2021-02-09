const Product = require('../models/product');

const postProduct = async(req, res, next) => {
  try {
    await Product.create({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      image: req.body.image
    });
    res.status(201).send("Success create user");
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
    res.status(201).send("Success delete user");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { postProduct, deleteProduct };
