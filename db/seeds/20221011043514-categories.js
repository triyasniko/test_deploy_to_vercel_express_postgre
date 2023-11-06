'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Fashion',
        image: 'https://ik.imagekit.io/triyasniko/Fashion_PAobGYAxY.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Books',
        image: 'https://ik.imagekit.io/triyasniko/Books__oqobUi68.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Laptop',
        image: 'https://ik.imagekit.io/triyasniko/Laptop_4UV-UFUBs.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Video Games',
        image: 'https://ik.imagekit.io/triyasniko/Video_Games_76fFHgD06.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Furniture',
        image: 'https://ik.imagekit.io/triyasniko/Furniture_nhoiLxUPQ.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name : 'Handphone',
        image : 'https://ik.imagekit.io/triyasniko/Handphone_IZJiCwV3W.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name :'Accessories',
        image :'https://ik.imagekit.io/triyasniko/Accessories_0nE62GqsT.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {

  }
};
