import mongoose  from "mongoose"

const connectionRequstSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    recipient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    status:{
        type:"string",
        enum:["pending","accepted", "rejected"],
        default:"pending",
    },

    
},{timestamps:true});

const ConnectionRequest=mongoose.model("ConnectionRequest",connectionRequstSchema);

export default ConnectionRequest;