const mongo=require('mongoose');
// Model for public chatroom
const chatroomSchema=new mongo.Schema({
    name:{
        type:String,
        required:"Name is required"
    },
    members:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"User"
    }
},{
    timestamps:true
});

module.exports=mongo.model("Chatroom",chatroomSchema);