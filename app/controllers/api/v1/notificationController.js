const notificationService=require('../../../services');
module.exports={
    async getAllNotification(req,res){
        try{
            const notification_type=req.query.notification_type;
            const notification=await notificationService.api.v1.notificationService.getAllNotification(notification_type, req.user.id);
            return res.status(200).json(notification);
        }catch(error){
            return res.status(500).json(error);
        }   
    },
    async getNotificationById(req,res){
        try{
            const id=req.params.id;
            const notification=await notificationService.api.v1.notificationService.getNotificationById(id);
            if(notification){
                return res.status(200).json(notification);
            }else{
                return res.status(404).json({message:'Notification not found'});
            }
        }catch(error){
            return res.status(500).json(error);
        }   
    },
    async updateNotification(req,res){
        try{
            const id=req.params.id;
            // update notification read tobe true
            const notification=await notificationService.api.v1.notificationService.updateNotification(id);
            if(notification){
                return res.status(200).json(notification);
            }else{
                return res.status(404).json({message:'Notification not found'});
            }
        }catch(error){
            return res.status(500).json(error);
        }   
    }
}