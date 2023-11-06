const categoryRepository=require('../../../repositories');
module.exports={
    async getAllCategory(){
        return await categoryRepository.api.v1.categoryRepository.getAll();
    },
    async getCategoryById(id){
        return await categoryRepository.api.v1.categoryRepository.getById(id);
    }
};