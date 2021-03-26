const mongo=require('mongoose');

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
    }
});

module.exports=mongo.model("ChatroomMessage",chatroomMessageSchema);