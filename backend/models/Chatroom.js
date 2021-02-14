const mongo=require('mongoose');

const chatroomSchema=new mongo.Schema({
    name:{
        type:String,
        required:"Name is required"
    }
},{
    timestamps:true
});

module.exports=mongo.model("Chatroom",chatroomSchema);