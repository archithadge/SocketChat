const mongo=require('mongoose');

const userSchema=new mongo.Schema({
    name:{
        type:String,
        required:"Name is required"
    },
    email:{
        type:String,
        required:"Email is required"
    },
    password:{
        type:String,
        required:"Password is required"
    }
},{
    timestamps:true
});

module.exports=mongo.model("User",userSchema);