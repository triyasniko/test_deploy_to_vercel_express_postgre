const { Users } = require('../../../models');

module.exports = {
  async findByName(full_name) {
    return await Users.findOne({
      where: { full_name },
    });
  },

  async findByEmail(email) {
    // console.log("####testtt", email);
    return await Users.findOne({
      where: { email },
    });
  },

  async findById(id) {
    // console.log("####testtt", id);
    return await Users.findByPk(id);
  },

  async findUser(id) {
    // console.log("####testtt", id);
    return await Users.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    });
  },

  async addProfil(id, userArgs) {
    return await Users.update(userArgs, { 
      where: { id } 
    });
  },

  async save(saveArgs) {
    return await Users.create(saveArgs);
  },

};
