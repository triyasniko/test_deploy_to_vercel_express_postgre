const { Products, Users, Like, Orders, Categories, Notifications } = require("../../../models");
const { Op } = require("sequelize");
module.exports={
    async getAllOrderBuyer(buyer_id, status){
        // console.log("### Test order repository ###", buyer_id);
        if(status){
            const order =await Orders.findAll({
                where:{
                    buyer_id:buyer_id,
                    status:status
                },
                include:[
                    {
                        model:Products,
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as:'Buyer',
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            // console.log("### Test order repository ###", order);
            return order;
        }else{
            const order =await Orders.findAll({
                where:{
                    buyer_id:buyer_id,
                },
                include:[
                    {
                        model:Products,
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as:'Buyer',
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            // console.log("### Test order repository ###", order);
            return order;
        }
    },
    async getOrderBuyerById(buyer_id, order_id){
        // console.log("### Test order repository ###", buyer_id);
        const order =await Orders.findOne({
            where:{
                buyer_id:buyer_id,
                id:order_id
            },
            include:[
                {
                    model:Products,
                    include:[
                        {
                            model:Users,
                        }
                    ]
                },
                {
                    model:Users,
                    as:'Buyer',
                    attributes:{
                        exclude:['password', 'foto', 'createdAt', 'updatedAt']
                    }
                }
            ]
        });
        // console.log("### Test order repository ###", order);
        return order;
    },
    async createOrderBuyer(buyer_id, reqBody){
        // console.log("### Test order repository ###", buyer_id, reqBody.product_id);
        const product=await Products.findOne({
            where:{
                id:reqBody.product_id
            },
            include:[
                {
                    model:Users,
                } 
            ]
        });
        const buyer=await Users.findOne({
            where:{
                id:buyer_id
            }
        });
        // console.log("### Test order sellerrr ###", product.User.full_name);
        // console.log("### Test order buyerrrr ###", buyer.full_name);
        // condition price can't more than product base price and less than 50% of product base price
        if(reqBody.price>product.base_price){
            return {
                message: "Price can't more than product base price"
            };
        }else if(reqBody.price<product.base_price/2){
            return {
                message: "Your offering price is too low"
            };
        }else{
            // check if user already make order to this product
            const checkIsOrder=await Orders.findOne({
                where:{
                    buyer_id:buyer_id,
                    product_id:reqBody.product_id
                }
            });
            // console.log("### Test order repository ###", checkIsOrder);
            if(checkIsOrder){
                return {
                    message: "You already make order to this product"
                };
            }else{
                // console.log("### Test order repository ###", order);
                // console.log("### Test order repository ###", product);
                const order=await Orders.create({
                    buyer_id:buyer_id,
                    seller_id:product.user_id,
                    product_id:reqBody.product_id,
                    price: reqBody.price,
                    transaction_date: new Date(),
                    product_name: product.name,
                    base_price: product.base_price,
                    image_url: product.image_url,
                    status: "pending",
                });
                if(order){
                    const notification=await Notifications.create({
                        product_id: order.product_id,
                        product_name: order.product_name,
                        bid_price: order.price,
                        transaction_date: order.transaction_date,
                        status: "bid",
                        notification_type: "seller",
                        order_id: order.id,
                        seller_name: product.User.full_name,
                        buyer_name: buyer.full_name,
                        receiver_id: product.User.id,
                        image_url: product.image_url,
                        read: false,
                    });
                    return order;
                }
            }
        }
    },
    async updateOrderBuyer(buyer_id, order_id, reqBody){
        const order=await Orders.findOne({
            where:{
                buyer_id:buyer_id,
                id:order_id
            }
        });
        // console.log("### Test order repository ###", order);
        if(order){
            const product=await Products.findOne({
                where:{
                    id: order.product_id
                }
            });
            // console.log("### Test order repository ###", product);
            // condition price can't more than product base price and less than 50% of product base price
            if(reqBody.price>product.base_price){
                return {
                    message: "Price can't more than product base price"
                };
            }else if(reqBody.price<product.base_price/2){
                return {
                    message: "Your offering price is too low"
                };
            }else{
                const updateOrder=await Orders.update({
                    price: reqBody.price,
                    transaction_date: new Date(),
                    status: "pending",
                },{
                    where:{
                        buyer_id:buyer_id,
                        id:order_id
                    }
                });
                return updateOrder;
            }
        }else{
            return {
                message: "Order not found"
            };
        }
    },
    async deleteOrderBuyer(buyer_id, order_id){
        const order=await Orders.findOne({
            where:{
                buyer_id:buyer_id,
                id:order_id
            }
        });
        // console.log("### Test order repository ###", order);
        if(order){
            const deleteOrder=await Orders.destroy({
                where:{
                    buyer_id:buyer_id,
                    id:order_id
                }
            });
            return deleteOrder;
        }else{
            return {
                message: "Order not found"
            };
        }
    },
    async getAllOrderSeller(seller_id, status){
        // console.log("### Test order repository ###", seller_id, status);
        if(status){
            const order =await Orders.findAll({
                where:{
                    seller_id:seller_id,
                    status:status
                },
                include:[
                    {
                        model:Products,
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as: "Buyer",
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            // console.log("### Test order repository ###", order);
            return order;
        }else{
            const order =await Orders.findAll({
                where:{
                    seller_id:seller_id
                },
                include:[
                    {
                        model:Products,
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as: "Buyer",
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            // console.log("### Test order repository ###", order);
            return order;
        }
    },
    async getOrderSellerById(seller_id, order_id){
        // console.log("### Test order repository ###", seller_id);
        const order =await Orders.findOne({
            where:{
                seller_id:seller_id,
                id:order_id
            },
            include:[
                {
                    model:Products,
                    include:[
                        {
                            model:Users,
                        }
                    ]
                },
                {
                    model:Users,
                    as: "Buyer",
                    attributes:{
                        exclude:['password', 'foto', 'createdAt', 'updatedAt']
                    }
                }
            ]
        });
        // console.log("### Test order repository ###", order);
        return order;
    },
    async updateOrderSeller(seller_id, order_id, reqBody){
        const order=await Orders.findOne({
            where:{
                seller_id:seller_id,
                id:order_id
            }
        });
        console.log("### Test order repository ###", order.product_id);
        if(order){
            // console.log("********Testtttt******");
            const product=await Products.findOne({
                where:{
                    id: order.product_id
                },
                include:[
                    {
                        model:Users,
                    }
                ]
            });
            const buyer=await Users.findOne({
                where:{
                    id: order.buyer_id
                }
            });
            // console.log("### Test order data product ###", product);
            const orderUpdate=await Orders.update({
                status: reqBody.status,
            },{
                where:{
                    seller_id:seller_id,
                    id:order_id
                }
            });
            // console.log("### Test order data order ###", product.User.full_name);
            // insert notification
            const notification=await Notifications.create({
                product_id: order.product_id,
                product_name: order.product_name,
                bid_price: order.price,
                transaction_date: order.transaction_date,
                status: reqBody.status,
                notification_type: "buyer",
                order_id: order.id,
                seller_name: product.User.full_name,
                buyer_name: buyer.full_name,
                receiver_id: order.buyer_id,
                image_url: product.image_url,
                read: false,
            });

            return orderUpdate;
        }else{
            return {
                message: "Order not found"
            };
        }
    },
    async getOrderSellerByProductId(seller_id, product_id){
        // console.log("### Test order repository ###", seller_id);
        const order =await Orders.findAll({
            where:{
                seller_id:seller_id,
                product_id:product_id
            },
            include:[
                {
                    model:Products,
                    include:[
                        {
                            model:Users,
                        }
                    ]
                },
                {
                    model:Users,
                    attributes:{
                        exclude:['password', 'foto', 'createdAt', 'updatedAt']
                    }
                }
            ]
        });
        // if order not empty then return order
        if(order.length>0){
            return order;
        }else{
            return {
                message: "No order found for this product"
            };
        }
    },
};