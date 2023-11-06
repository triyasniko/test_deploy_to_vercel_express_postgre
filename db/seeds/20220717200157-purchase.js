'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Purchases', [{
      id_produk: 2,
      id_pembeli: 1,
      tanggal_pembelian: new Date(),
      harga_tawar: 29000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_produk: 3,
      id_pembeli: 1,
      tanggal_pembelian: new Date(),
      harga_tawar: 29000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_produk: 4,
      id_pembeli: 1,
      tanggal_pembelian: new Date(),
      harga_tawar: 29000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id_produk: 5,
      id_pembeli: 1,
      tanggal_pembelian: new Date(),
      harga_tawar: 29000000,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
