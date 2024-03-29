const mongo=require('mongoose');
//Model for public chatroom message
const chatroomMessageSchema=new mongo.Schema({
    chatroom:{
        type:mongo.Schema.Types.ObjectId,
        required:"Chatroom is required",
        ref:"Chatroom"
    },
    user:{
        type:mongo.Schema.Types.ObjectId,
        required:"User is required",
        ref:"User"
    },
    message:{
        type:String,
        required:"Message is required"
    },
    name:{
        type:String
    }
});

module.exports=mongo.model("ChatroomMessage",chatroomMessageSchema);