'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', 
    [
      {
        name: 'Baju Kemeja',
        description: 'Baju kemeja pria',
        base_price: 100000,
        image_url: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2019/12/11/0/0_0b0e1b1a-1b1d-4b1d-9b1d-1b1d1b1d1b1d_700_700.jpg'],
        location: 'Jakarta',
        user_id: 1,
        category_id: 1,
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Baju Kaos',
        description: 'Baju kaos pria',
        base_price: 100000,
        image_url: ['https://ecs7.tokopedia.net/img/cache/700/product-1/2019/12/11/0/0_0b0e1b1a-1b1d-4b1d-9b1d-1b1d1b1d1b1d_700_700.jpg'],
        location: 'Jakarta',
        user_id: 1,
        category_id: 1,
        status: 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]
    );
  },

  async down (queryInterface, Sequelize) {
  }
};
