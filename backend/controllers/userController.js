const mongoose=require('mongoose');
const User=mongoose.model("User");
const sha256=require('js-sha256');
const jwt=require('jwt-then');

exports.register=async (req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    const user=new User({name,email,password:sha256(password+process.env.SALT)});
    await user.save();

    res.json({
        message:"User "+name+" registered successfully..!"
    });

};

exports.login=async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    const user=await User.findOne({
        email,
        password:sha256(password+process.env.SALT)
    });

    if(!user) throw "User doesn't exists";

    const token=await jwt.sign({id:user.id},process.env.SECRET);

    res.json({
        message:"User logged in successfully",
        token
    })

}