const mongo=require('mongoose');
// Model for public chatroom
const chatroomSchema=new mongo.Schema({
    name:{
        type:String,
        required:"Name is required"
    },
    creator:{
        type:mongo.Schema.Types.ObjectId,
        ref:"User",
    },
    userData:{
        type:Map,
        of:String
    }
},{
    timestamps:true
});

module.exports=mongo.model("Chatroom",chatroomSchema);