const Sequelize = require('sequelize');

module.exports = class Image extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      imageUrl: {
        type: Sequelize.STRING(200),
        allowNull: true
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Image',
      tableName: 'Images',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db) {
    db.Image.belongsTo(db.Product);
    db.Image.hasOne(db.Cart);
    db.Image.hasOne(db.wishList);
  }
};
