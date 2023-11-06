const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.Users, {
        foreignKey: 'user_id',
        // as: 'Users',
      });

      // Products.hasMany(models.Like, {
      //   foreignKey: 'id_produk',
      // });

      // Products.hasOne(models.Purchase, {
      //   foreignKey: 'id_produk',
      // });

      Products.belongsTo(models.Categories, {
        foreignKey: 'category_id',
      });
      Products.hasMany(models.Orders, {
        foreignKey: 'product_id',
      });
      Products.hasMany(models.Notifications,{
        foreignKey: 'product_id',
        as: 'product',
      });
      
    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    base_price: DataTypes.FLOAT,
    image_url: DataTypes.ARRAY(DataTypes.TEXT),
    location: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,

    // totalLike: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0,
    // },
    status: DataTypes.ENUM({
      values: ['available', 'pending', 'sold'],
      defaultValue: 'available',
    }),
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};
