const mongo=require('mongoose');
//Model for User
const userSchema=new mongo.Schema({
    firstname:{
        type:String,
        required:"First Name is required"
    },
    lastname:{
        type:String,
        required:"Last Name is required"
    },
    email:{
        type:String,
        required:"Email is required"
    },
    bio:{
        type:String,
    },
    friends:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"User"
    },
    friendrequests:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"User"
    },
    chatroomrequests:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"Chatroom"
    },
    chatrooms:{
        type:[mongo.Schema.Types.ObjectId],
        ref:"Chatroom"
    },
    profilephoto:{
        type:String
    },
    password:{
        type:String,
        required:"Password is required"
    }
},{
    timestamps:true
});

module.exports=mongo.model("User",userSchema);