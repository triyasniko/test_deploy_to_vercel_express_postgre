const { Products, Users, Like, Purchase, Categories } = require("../../../models");
const { Op } = require("sequelize");

module.exports = {
  async findAll(args) {
    return await Products.findAll({
      where: {
        user_id: args,
      },
      include: [
        {
          model: Categories,
          attributes: ["id","name"],
        },
      ]
    });
  },

  async getProductById(product_id) {
    console.log("############ id #########", product_id);
    const product=await Products.findOne({
      where: {
        id: product_id,
      },
      include: [
        {
          model: Categories,
          attributes: ["id","name"],
        }
      ],
    });
    return product; 

  },

  async createProduct(userId, reqBody) {
    // console.log("reqBody", reqBody);
    return await Products.create({
      name: reqBody.name,
      description: reqBody.description,
      base_price: reqBody.base_price,
      image_url:reqBody.image[0]? reqBody.image:null,
      location: reqBody.location,
      user_id: userId,
      category_id: reqBody.category_id,
      status: reqBody.status,
    });
  },

  async updateProduct(userId, product_id, reqBody) {
    const product=await Products.update(
      {
        name: reqBody.name,
        description: reqBody.description,
        base_price: reqBody.base_price,
        image_url: reqBody.image? reqBody.image:null,
        location: reqBody.location,
        user_id: userId,
        category_id: reqBody.category_id,
        status: reqBody.status,
      },
      {
        where: {
          id: product_id,
        },
      }
    );
    return product;
  },
  async deleteProduct(user_id,product_id) {
    return await Products.destroy({
      where: {
        id: product_id,
      },
    });
  },
  async getListAllProductBuyer(reqQuery) {
    console.log("reqQuery category_id", reqQuery.category_id);
    const status= reqQuery.status ? reqQuery.status : 'available';
    const category_id=reqQuery.category_id ? parseInt(reqQuery.category_id) : 0;
    const search=reqQuery.search ? reqQuery.search : '';
    const page=parseInt(reqQuery.page) || 1;
    const per_page=parseInt(reqQuery.per_page) || 10;
    const offset = (page - 1) * per_page;
    const totalRows= await Products.count();
    const totalPages = Math.ceil(totalRows / per_page);
    
    // data= combination of 3 request query (search, status, category_id) after checking the value of each query
    if(search && status && category_id){
      const data = await Products.findAll({
        where: {
          [Op.and]: [{name:{
              [Op.like]: `%${search}%`
            }}, {status: 
              status
            }, {category_id: 
              category_id
            }
          ]
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 2 request query (search, status) after checking the value of each query
    else if(search && status){
      const data = await Products.findAll({
        where: {
          [Op.and]: [{name:{
              [Op.like]: `%${search}%`
            }}, {status:
              status
            }
          ]
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 2 request query (search, category_id) after checking the value of each query
    else if(search && category_id){
      const data = await Products.findAll({
        where: {
          [Op.and]: [{name:{
              [Op.like]: `%${search}%`
            }}, {category_id:
              category_id
            }
          ]
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 2 request query (status, category_id) after checking the value of each query
    else if(status && category_id){
      const data = await Products.findAll({
        where: {
          [Op.and]: [{status:status
            }, {category_id:
              category_id
            }
          ]
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 1 request query (search) after checking the value of each query
    else if(search){
      const data = await Products.findAll({
        where: {
          name:{
              [Op.like]: `%${search}%`
            }
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 1 request query (status) after checking the value of each query
    else if(status){
      const data = await Products.findAll({
        where: {
          status:status
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
    // data= combination of 1 request query (category_id) after checking the value of each query
    else if(category_id){
      const data = await Products.findAll({
        where: {
          category_id:  category_id
        },
        include: [
          {
            model: Categories,
            attributes: ["id","name"],
          },
        ],
        offset: offset,
        limit: per_page,
      });
      return {
        data,
        meta: {
          page,
          per_page,
          totalRows,
          totalPages,
        },
      };
    }
  },
  async getProductBuyerById(product_id) {
    const product=await Products.findOne({
      where: {
        id: product_id,
      },
      include: [
        {
          model: Categories,
          attributes: ["id","name"],
        },
        {
          model: Users,
          attributes:{
            exclude: ["password", "createdAt", "updatedAt"],
          }
        }
      ],
    });
    console.log("##########product##########", product);
    return product;
  },
};
