const orderRepository=require('../../../repositories');
module.exports={
    async getAllOrderBuyer(buyer_id, status){
        // console.log("### Test order service ###", buyer_id);
        return await orderRepository.api.v1.orderRepository.getAllOrderBuyer(buyer_id, status);
    },
    async getOrderBuyerById(buyer_id, order_id){
        // console.log("### Test order service ###", buyer_id);
        return await orderRepository.api.v1.orderRepository.getOrderBuyerById(buyer_id, order_id);
    },
    async createOrderBuyer(buyer_id, reqBody){
        // console.log("### Test order service ###", buyer_id);
        return await orderRepository.api.v1.orderRepository.createOrderBuyer(buyer_id, reqBody);
    },
    async updateOrderBuyer(buyer_id, order_id, reqBody){
        // console.log("### Test order service ###", buyer_id);
        return await orderRepository.api.v1.orderRepository.updateOrderBuyer(buyer_id, order_id, reqBody);
    },
    async deleteOrderBuyer(buyer_id, order_id){
        // console.log("### Test order service ###", buyer_id);
        return await orderRepository.api.v1.orderRepository.deleteOrderBuyer(buyer_id, order_id);
    },
    async getAllOrderSeller(seller_id, status){
        return await orderRepository.api.v1.orderRepository.getAllOrderSeller(seller_id, status);
    },
    async getOrderSellerById(seller_id, order_id){
        return await orderRepository.api.v1.orderRepository.getOrderSellerById(seller_id, order_id);
    },
    async updateOrderSeller(seller_id, order_id, reqBody){
        return await orderRepository.api.v1.orderRepository.updateOrderSeller(seller_id, order_id, reqBody);
    },
    async getOrderSellerByProductId(seller_id, product_id){
        return await orderRepository.api.v1.orderRepository.getOrderSellerByProductId(seller_id, product_id);
    }
};