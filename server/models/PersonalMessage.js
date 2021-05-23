const mongo=require('mongoose');

//Model for private message between 2 users.
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
    },
    name:{
        type:String
    }
});

module.exports=mongo.model("PersonalMessage",personalMessageSchema);