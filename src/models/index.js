'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; //배포할 때 production으로 설정
const config = require('../config/index')[env];
const db = {};

const Product = require('./product');

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;

db.Product = Product;
Product.init(sequelize);

Product.associate(db);

module.exports = db;