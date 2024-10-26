import Notification from "../models/notification.model.js"
export const  getUserNotifications = async(req,res)=>{
    try {
        
        const notification = await Notification.find({recipient:req.user._id}).sort({ createdAt:-1})
        .populate("relatedUser", "name username  profilePicture")
        .populate("relatedPost", "content image")

        res.status(200).json(notification);
    } catch (error) {
        console.error("error occured in the Notification controller route",error);
        res.status(500).json({message:"internal server error"})
        
    }

}

export const markNotificationAsRead= async(req,res)=>{
    const notificationId=req.params.id;
    try {
        const notification = await Notification.findByIdAndUpdate(
            {_id:notificationId,recipient:req.user._id},
            {read:true},
            {new:true}
        );

        res.json(notification);
    
    } catch (error) {
        console.error("error occured in  markNotificationAsRead controller",error);
        res.status(500).json({message:"Internal server errror"});
        
    }
}
export const  deleteNotification= async(req,res)=>{

    const notificationId = req.params.id;
    try {
        await Notification.findByIdAndDelete({
            _id:notificationId,
            recipient:req.user._id
        })

        res.json({message:"Notification deleted succedsfuilly:"});
    }catch (error) {
        res.status(500).json({message:"Internal Server Error"});
    }
}