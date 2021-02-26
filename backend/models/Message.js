const mongo=require('mongoose');

const messageSchema=new mongo.Schema({
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
        required:"Message is z"
    }
});

module.exports=mongo.model("Message",messageSchema);