const mongoose=require('mongoose');
const User=mongoose.model("User");
const sha256=require('js-sha256');
const jwt=require('jwt-then');

//Register new users
exports.register=async (req,res)=>{
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const bio=req.body.bio;
    const password=req.body.password;

    const user=new User({firstname,lastname,email,bio,password:sha256(password+process.env.SALT)});
    await user.save();

    res.json({
        message:"User "+firstname+" "+lastname+" registered successfully..!"
    });

};

//Login new user
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
        token:token,
        uid:user._id
    })

}

//Get all users
exports.getAllUsers=async (req,res)=>{
    const users=await User.find({}).select(['_id','name'])
    res.json(users);
}