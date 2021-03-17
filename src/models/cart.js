const Sequelize = require('sequelize');

module.exports = class Cart extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
      }
    }, {
      sequelize,
      timestamps: true,
      modelName: 'Cart',
      tableName: 'Carts',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.Cart.belongsTo(db.Product);
  } 
}
