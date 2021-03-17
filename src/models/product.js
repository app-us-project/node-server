const Sequelize = require('sequelize');

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
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Product',
      tableName: 'Products',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Product.hasMany(db.Image);
    db.Product.hasMany(db.Cart);
    db.Product.hasMany(db.wishList);
    db.Product.belongsToMany(db.Category, { through: 'ProductCategory' });
  }
};
