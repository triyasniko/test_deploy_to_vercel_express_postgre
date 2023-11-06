const productService = require('../../../services');

module.exports = {

  async getAllProduct(req, res) {
    try {
      // console.log("#testt", req.user.id);
      const produk = await productService.api.v1.productService.listAll(req.user.id)
      res.status(200).json({
        status: 'OK',
        // produk
        // show all product properties except category_id
        produk: produk.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            base_price: item.base_price,
            image_url: item.image_url,
            location: item.location,
            user_id: item.user_id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            category: item.Category,
          }
        })
      });
    } catch (err) {
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async getProductById(req, res) {
    // get product by id and product is own by user login
    try {
      const product_id= req.params.id;
      const produk = await productService.api.v1.productService.getProductById(product_id);
      // not found product
      if (!produk || produk.length === 0 || produk === null) {
        return res.status(404).json({
          status: 'productNotFound',
          message: 'Product not found',
        });
      }else if (produk.user_id !== req.user.id) {
        return res.status(403).json({
          status: 'FAIL',
          message: 'Access not allowed',
        });
      }else{
        res.status(200).json({
          status: 'OK',
          produk: {
            id: produk.id,
            name: produk.name,
            description: produk.description,
            base_price: produk.base_price,
            image_url: produk.image_url,
            location: produk.location,
            user_id: produk.user_id,
            createdAt: produk.createdAt,
            updatedAt: produk.updatedAt,
            category: produk.Category,
          }
        });
      }

    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async createProduct(req, res) {
    try{
      const { name, description, base_price, category_id, location } = req.body;
      // console.log("### TEST #### ", req.user.id, req.body);
      const produk = await productService.api.v1.productService.createProduct(req.user.id, {
        name: name,
        description: description,
        base_price: base_price,
        category_id: category_id,
        status: 'available',
        location: location,
        image: req.image,
      });
      res.status(200).json({
        status: 'OK',
        produk: {
          id: produk.id,
          name: produk.name,
          description: produk.description,
          base_price: produk.base_price,
          image_url: produk.image_url,
          location: produk.location,
          user_id: produk.user_id,
          createdAt: produk.createdAt,
          updatedAt: produk.updatedAt,
          category: produk.Category,
        }
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async updateProduct(req, res) {
    try{
      const { name, description, base_price, category_id, location } = req.body;
      const getProductById= await productService.api.v1.productService.getProductById(req.params.id);
      // not found product
      if (!getProductById || getProductById.length === 0 || getProductById === null) {
        return res.status(404).json({
          status: 'productNotFound',
          message: 'Product not found',
        });
      }else if (getProductById.user_id !== req.user.id) {
        return res.status(403).json({
          status: 'FAIL',
          message: 'Access not allowed',
        });
      }else{
        const produk = await productService.api.v1.productService.updateProduct(req.user.id, req.params.id, {
          name: name,
          description: description,
          base_price: base_price,
          category_id: category_id,
          status: 'available',
          location: location,
          image: req.image[0]?req.image:getProductById.image_url,
        });
        res.status(200).json({
          status: 'OK',
          produk: {
            id: produk.id,
            name: produk.name,
            description: produk.description,
            base_price: produk.base_price,
            image_url: produk.image_url,
            location: produk.location,
            user_id: produk.user_id,
            createdAt: produk.createdAt,
            updatedAt: produk.updatedAt,
            category: produk.Category,
          }
        });
      }
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async deleteProduct(req, res) {
    try{
      await productService.api.v1.productService.deleteProduct(req.user.id, req.params.id);
      res.status(200).json({
        status: 'OK',
        message: 'Product has been deleted',
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async getListAllProductBuyer(req, res) {
    try{
      const{
        status,
        category_id,
        search,
        page,
        per_page
      }= req.query;
      const produk = await productService.api.v1.productService.getListAllProductBuyer(req.query);
      res.status(200).json({
        status: 'OK',
        produk: produk.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            base_price: item.base_price,
            image_url: item.image_url,
            location: item.location,
            user_id: item.user_id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            category: item.Category,
          }
        }),
        page: produk.meta.page,
        per_page: produk.meta.per_page,
        totalRows: produk.meta.totalRows,
        totalPages: produk.meta.totalPages,
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
  async getProductBuyerById(req, res) {
    try{
      const produk = await productService.api.v1.productService.getProductBuyerById(req.params.id);
      if (!produk || produk.length === 0 || produk === null) {
        return res.status(404).json({
          status: 'productNotFound',
          message: 'Product not found',
        });
      }
      res.status(200).json({
        status: 'OK',
        // loop respond from data produk
        produk
      });
    }catch(err){
      res.status(400).json({
        status: 'FAIL',
        message: err.message,
      });
    }
  },
};