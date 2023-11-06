'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    static associate(models) {
      // have relation with product
      Notifications.belongsTo(models.Products, {
        foreignKey: 'product_id',
        as: 'product',
      });
      Notifications.belongsTo(models.Users, {
        foreignKey: 'receiver_id',
        as: 'receiver',
      });
    }
  }
  Notifications.init({
    product_id: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    bid_price: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    status: DataTypes.STRING,
    notification_type: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    seller_name: DataTypes.STRING,
    buyer_name: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER,
    image_url: DataTypes.ARRAY(DataTypes.TEXT),
    read: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Notifications',
  });
  return Notifications;
};