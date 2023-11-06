const controllers = require('../app/controllers');
const express = require('express');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/swagger.json');
const middlewares = require('../app/middlewares');

const appRouter = express.Router();
const apiRouter = express.Router();

// open api document
router.use('/document', swaggerUi.serve);
router.get('/document', swaggerUi.setup(swaggerDocument));

// User router
router.post(
  '/api/v1/auth/register',
  controllers.api.v1.userController.postRegister,
);
router.post(
  '/api/v1/auth/login',
  controllers.api.v1.userController.postLogin,
);
router.put(
  '/api/v1/auth/user',
  // uploadOnMemory.single('img'), you can use this to up 1 image only
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.postProfile,
);
router.get(
  '/api/v1/auth/user',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.userController.whoAmI,
);
// route categories
router.get(
  '/api/v1/seller/category',
  controllers.api.v1.categoryController.getAllCategory,
);
// get route categories by id
router.get(
  '/api/v1/seller/category/:id',
  controllers.api.v1.categoryController.getCategoryById,
);

router.get(
  '/api/v1/seller/product/all',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.getAllProduct,
);
router.get(
  '/api/v1/seller/product/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.getProductById,
);
router.post(
  '/api/v1/seller/product',
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.createProduct,
);
router.put(
  '/api/v1/seller/product/:id',
  middlewares.uploadOnMemory.any(),
  middlewares.uploader.upload,
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.updateProduct,
);
router.delete(
  '/api/v1/seller/product/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.productController.deleteProduct,
);
router.get(
  '/api/v1/buyer/product',
  controllers.api.v1.productController.getListAllProductBuyer,
);
router.get(
  '/api/v1/buyer/product/:id',
  controllers.api.v1.productController.getProductBuyerById,
);
router.get(
  '/api/v1/buyer/order',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.getAllOrderBuyer,
);
router.get(
  '/api/v1/buyer/order/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.getOrderBuyerById,
);
router.put(
  '/api/v1/buyer/order/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.updateOrderBuyer,
);
router.post(
  '/api/v1/buyer/order',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.createOrderBuyer,
);
router.delete(
  '/api/v1/buyer/order/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.deleteOrderBuyer,
);
router.get(
  '/api/v1/seller/order',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.getAllOrderSeller,
);
router.get(
  '/api/v1/seller/order/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.getOrderSellerById,
);
router.patch(
  '/api/v1/seller/order/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.updateOrderSeller,
);
router.get(
  '/api/v1/seller/order/product/:productId',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.orderController.getOrderSellerByProductId,
);

router.get(
  '/api/v1/notification',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.notificationController.getAllNotification,
);
router.get(
  '/api/v1/notification/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.notificationController.getNotificationById,
);
router.patch(
  '/api/v1/notification/:id',
  controllers.api.v1.userController.authorize,
  controllers.api.v1.notificationController.updateNotification,
);

appRouter.use(apiRouter);

module.exports = router;
