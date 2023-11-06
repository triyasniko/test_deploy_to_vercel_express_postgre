'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = "123456";
    const encryptedPassword = bcrypt.hashSync(password, 10)

    await queryInterface.bulkInsert('Users', [{
      full_name: 'user-1',
      email: 'user1@gmail.com',
      password: encryptedPassword,
      city: 'Menara Kudus',
      address: 'jln yang indah dengan mu',
      phone_number: '081244566881',
      foto: 'https://ik.imagekit.io/rizkioktav70/IMG-1657790861342_OnN1TnQ0j.img',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      full_name: 'user-2',
      email: 'user2@gmail.com',
      password: encryptedPassword,
      city: 'Semarang',
      address: 'Krapyak',
      phone_number:'081235333554',
      foto: 'https://ik.imagekit.io/rizkioktav70/IMG-1657790861342_OnN1TnQ0j.img',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      full_name: 'user-3',
      email: 'user3@gmail.com',
      password: encryptedPassword,
      city: null,
      address: null,
      phone_number: null,
      foto: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
