'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // have relation with product
      Orders.belongsTo(models.Products, {
        foreignKey: 'product_id',
      });
      // have relation with user
      Orders.belongsTo(models.Users, {
        foreignKey: 'buyer_id',
        as: 'Buyer',
      });
      Orders.belongsTo(models.Users, {
        foreignKey: 'seller_id',
        as: 'Seller',
      });
      
    }
  }
  Orders.init({
    product_id: DataTypes.INTEGER,
    buyer_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    product_name: DataTypes.STRING,
    base_price: DataTypes.INTEGER,
    image_url: DataTypes.ARRAY(DataTypes.TEXT),
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};