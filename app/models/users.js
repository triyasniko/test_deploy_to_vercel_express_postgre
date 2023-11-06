const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Products, {
        foreignKey: 'user_id',
        // as: 'Users'
      });
      Users.hasMany(models.Orders, {
        foreignKey: 'buyer_id',
        as: 'Buyer',
      });
      Users.hasMany(models.Orders, {
        foreignKey: 'seller_id',
        as: 'Seller',
      });
      Users.hasMany(models.Notifications, {
        foreignKey: 'receiver_id',
        as: 'receiver',
      });
    }
  }
  Users.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
