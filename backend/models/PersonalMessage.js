const mongo=require('mongoose');

const personalMessageSchema=new mongo.Schema({
    
    sender:{
        type:mongo.Schema.Types.ObjectId,
        required:"User is required",
        ref:"User"
    },
    receiver:{
        type:mongo.Schema.Types.ObjectId,
        required:"User is required",
        ref:"User"
    },
    chatroom:{
        type:String
    },
    message:{
        type:String,
        required:"Message is required"
    }
});

module.exports=mongo.model("PersonalMessage",personalMessageSchema);