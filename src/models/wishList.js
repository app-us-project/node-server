const { Sequelize } = require('sequelize');

module.exports = class wishList extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      title: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(40),
        allowNull: false,
      }
    }, {
      sequelize,
      timestamps: true,
      modelName: 'wishList',
      tableName: 'wishLists',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){
    db.wishList.belongsTo(db.Product);
  }
}
