const orderService=require('../../../services');

module.exports = {
    async getAllOrderBuyer(req, res) {
        try {
            const buyer_id  = req.user.id;
            const { status } = req.query;
            // console.log("### Test order controller ###", buyer_id);
            const order = await orderService.api.v1.orderService.getAllOrderBuyer(buyer_id, status);
            if(order.length>0){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({message: "No Order Found"});
            }
        } catch (error) {
            return res.status(500).json(error);
        }
        // console.log("### Test order controller ###");
    },

    async getOrderBuyerById(req, res) {
        try {
            const buyer_id  = req.user.id;
            const order_id = req.params.id;
            // console.log("### Test order controller ###", buyer_id);
            const order= await orderService.api.v1.orderService.getOrderBuyerById(buyer_id, order_id);
            if(order){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async createOrderBuyer(req, res) {
        try {
            const buyer_id=req.user.id;
            // console.log("### Test order controller ###", buyer_id);
            const { product_id,price }=req.body;
            // console.log("### Test order controller ###", product_id,price);
            const order = await orderService.api.v1.orderService.createOrderBuyer(buyer_id, req.body);
            // console.log("### Test order controller ###", order);
            // insert data notification seller

            return res.status(200).json({
                message: "Order created successfully",
                order: order
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async updateOrderBuyer(req, res) {
        try{
            const buyer_id=req.user.id;
            const order_id=req.params.id;
            const { price }=req.body;
            const order=await orderService.api.v1.orderService.updateOrderBuyer(buyer_id, order_id, req.body);
            if(order){
                return res.status(200).json({
                    message: "Order updated successfully",
                    order: order
                });
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        }catch(error){
            return res.status(500).json(error);
        }
    },

    async deleteOrderBuyer(req, res) {
        try{
            const buyer_id=req.user.id;
            const order_id=req.params.id;
            const order=await orderService.api.v1.orderService.deleteOrderBuyer(buyer_id, order_id);
            if(order){
                return res.status(200).json({
                    message: "Order deleted successfully",
                    order: order
                });
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        }catch(error){
            return res.status(500).json(error);
        }
    },

    async getAllOrderSeller(req, res) {
        try {
            const seller_id  = req.user.id;
            const { status } = req.query;
            // console.log("### Test order controller ###", seller_id, status);
            const order = await orderService.api.v1.orderService.getAllOrderSeller(seller_id, status);
            // if not empty give respond order
            if(order.length>0){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({message: "No Order Found"});
            }
        } catch (error) {
            return res.status(500).json(error);
        }
        // console.log("### Test order controller ###");
    },

    async getOrderSellerById(req, res) {
        try {
            const seller_id  = req.user.id;
            const order_id = req.params.id;
            // console.log("### Test order controller ###", seller_id);
            const order= await orderService.api.v1.orderService.getOrderSellerById(seller_id, order_id);
            if(order){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async updateOrderSeller(req, res) {
        try{
            const seller_id=req.user.id;
            const order_id=req.params.id;
            const { status }=req.body;
            const order=await orderService.api.v1.orderService.updateOrderSeller(seller_id, order_id, req.body);
            if(order){
                return res.status(200).json({
                    message: "Order updated successfully",
                    order: order
                });
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        }catch(error){
            return res.status(500).json(error);
        }
    },

    async getOrderSellerByProductId(req, res) {
        try {
            const seller_id  = req.user.id;
            const product_id = req.params.productId;
            console.log("### Test order controller ###", seller_id, product_id);
            const order= await orderService.api.v1.orderService.getOrderSellerByProductId(seller_id, product_id);
            if(order){
                return res.status(200).json(order);
            }else{
                return res.status(404).json({message: "Order not found"});
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    
};