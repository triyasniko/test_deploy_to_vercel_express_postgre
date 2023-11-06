const { Categories }= require('../../../models');
module.exports={
    async getAll(){
        return await Categories.findAll();
    },
    async getById(id){
        return await Categories.findByPk(id);
    }
}