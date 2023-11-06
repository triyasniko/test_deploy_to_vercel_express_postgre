const { Notifications, Products, Users }= require('../../../models');
module.exports={
    async getAllNotification(notification_type, user_id){
        if(notification_type){
            const notification= Notifications.findAll({
                where:{
                    notification_type:notification_type,
                    receiver_id:user_id
                },
                include:[
                    {
                        model:Products,
                        as: 'product',
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as : 'receiver',
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            return notification;
        }else{
            const notification= Notifications.findAll({
                where:{
                    receiver_id:user_id
                },
                include:[
                    {
                        model:Products,
                        as: 'product',
                        include:[
                            {
                                model:Users,
                            }
                        ]
                    },
                    {
                        model:Users,
                        as : 'receiver',
                        attributes:{
                            exclude:['password', 'foto', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            });
            return notification;
        }
    },
    async getNotificationById(id){
        const notification= Notifications.findOne({
            where:{
                id:id
            },
            include:[
                {
                    model:Products,
                    include:[
                        {
                            model:Users,
                        }
                    ]
                },
                // {
                //     model:Users,
                //     as : 'receiver',
                //     attributes:{
                //         exclude:['password', 'foto', 'createdAt', 'updatedAt']
                //     }
                // }
            ]
        });
        return notification;
    },
    async updateNotification(id){
        const notification= Notifications.update({
            read:true
        },{
            where:{
                id:id
            }
        });
        return notification;
    },
}