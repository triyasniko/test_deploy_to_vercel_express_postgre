const notificationRepository= require('../../../repositories');
module.exports={
    async getAllNotification(notification_type, user_id){
        return await notificationRepository.api.v1.notificationRepository.getAllNotification(notification_type, user_id);
    },
    async getNotificationById(id){
        return await notificationRepository.api.v1.notificationRepository.getNotificationById(id);
    },
    async updateNotification(id){
        return await notificationRepository.api.v1.notificationRepository.updateNotification(id);
    }
}