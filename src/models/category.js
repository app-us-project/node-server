const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      category: {
        type: Sequelize.STRING(20),
        allowNull: false,
      }
    },{
      sequelize,
      timestamps: false,
      modelName: 'Category',
      tableName: 'Categories',
      charset: 'utf8',
      collate: 'utf8_general_ci',
    })
  }
  static associate(db){
    db.Category.belongsToMany(db.Product, { through: 'ProductCategory' });
  }
} 
