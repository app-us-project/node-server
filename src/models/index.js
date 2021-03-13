'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'local'; //배포할 때 production으로 설정
const config = require('../config/index')[env];
const db = {};

const Product = require('./product');
const Image = require('./image');
const Cart = require('./cart');
const Category = require('./category');
const wishList = require('./wishList');

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;

db.Product = Product;
db.Image = Image;
db.Cart = Cart;
db.Category = Category;
db.wishList = wishList;

Product.init(sequelize);
Image.init(sequelize);
Cart.init(sequelize);
Category.init(sequelize);
wishList.init(sequelize);

Product.associate(db);
Image.associate(db);
Cart.associate(db);
Category.associate(db);
wishList.associate(db);

module.exports = db;