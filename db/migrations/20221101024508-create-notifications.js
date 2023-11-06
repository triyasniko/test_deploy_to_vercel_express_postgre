'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id:{
        type: Sequelize.INTEGER,
      },
      product_name:{
        type: Sequelize.STRING,
      },
      bid_price:{
        type: Sequelize.INTEGER,
      },
      transaction_date:{
        type: Sequelize.DATE,
      },
      status:{
        type: Sequelize.STRING,
      },
      notification_type:{
        type: Sequelize.STRING,
      },
      order_id:{
        type: Sequelize.INTEGER,
      },
      seller_name:{
        type: Sequelize.STRING,
      },
      buyer_name:{
        type: Sequelize.STRING,
      },
      receiver_id:{
        type: Sequelize.INTEGER,
      },
      image_url:{
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      read: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};