const { Sequelize } = require('sequelize');

module.exports = class Product extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Product',
      tableName: 'products',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {}
};