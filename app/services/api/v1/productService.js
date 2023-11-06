const productRepository = require('../../../repositories');

module.exports = {
  async listAll(args) {
    return await productRepository.api.v1.productRepository.findAll(args);
  },

  async getProductById(product_id) {
    return await productRepository.api.v1.productRepository.getProductById(product_id);
  },

  async createProduct(userId, reqBody){
    // console.log("reqBody",reqBody);
    return await productRepository.api.v1.productRepository.createProduct(userId,reqBody);
  },

  async updateProduct(userId, product_id, reqBody) {
    return await productRepository.api.v1.productRepository.updateProduct(userId, product_id, reqBody);
  },

  async deleteProduct(user_id,product_id) {
    return await productRepository.api.v1.productRepository.deleteProduct(user_id,product_id);
  },

  async getListAllProductBuyer(reqQuery){
    return await productRepository.api.v1.productRepository.getListAllProductBuyer(reqQuery);
  },
  async getProductBuyerById(product_id){
    return await productRepository.api.v1.productRepository.getProductBuyerById(product_id);
  }
};
