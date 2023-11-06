'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {

    static associate(models) {
      Categories.hasMany(models.Products, {
        foreignKey: 'category_id',
      });
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};