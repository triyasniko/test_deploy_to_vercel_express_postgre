const categoryService=require('../../../services');
module.exports={
    async getAllCategory(req,res){
        try{
            const data=await categoryService.api.v1.categoryService.getAllCategory();
            res.status(200).json({
                status:'Success',
                data
            });
        }
        catch(err){
            res.status(400).json({
                status:'FAIL',
                message:err.message
            });
        }
    },
    async getCategoryById(req,res){
        try{
            const data=await categoryService.api.v1.categoryService.getCategoryById(req.params.id);
            res.status(200).json({
                status:'Success',
                data
            });
        }
        catch(err){
            res.status(400).json({
                status:'FAIL',
                message:err.message
            });
        }
    }

};
