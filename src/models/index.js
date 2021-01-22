'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; //배포할 때 production으로 설정
const config = require('../config/index')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;

module.exports = db;