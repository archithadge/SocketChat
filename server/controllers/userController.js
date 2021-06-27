const mongoose = require('mongoose');
const User = mongoose.model("User");
const sha256 = require('js-sha256');
const jwt = require('jwt-then');
const Chatroom = require('../models/Chatroom');


//Register new users
exports.register = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const bio = req.body.bio;
    const password = req.body.password;
    const profilephoto = req.body.profilephoto;

    const user = new User({
        firstname,
        lastname,
        email,
        bio,
        password: sha256(password + process.env.SALT),
        profilephoto: 'http://localhost:8000/profilepics/' + req.file.filename
    });

    var check=await User.find({email});
    console.log(check);
    if(check.length!=0)throw 'User with this email already exists..!Try with different email.';
    await user.save((err, data) => {
        console.log(data._id);
    });

    console.log(req.file.filename);

    res.json({
        message: "User " + firstname + " " + lastname + " registered successfully..!"
    });

};

//Login new user
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email,sha256(password + process.env.SALT));
    const user = await User.findOne({
        email:email,
        password: sha256(password + process.env.SALT)
    });

    if (!user) throw "User doesn't exists";

    const token = await jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
        message: "User logged in successfully",
        token: token,
        uid: user._id
    })

}

//Get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find({}).select(['_id', 'name'])
    res.json(users);
}

exports.acceptrequest=async (req,res)=>{
    const chatroomID=req.body.chatroomID;
    const userID=req.payload.id;

    const chatroom=await Chatroom.findOne({_id:chatroomID});
    const user=await User.findOne({_id:userID});
    // console.log(user,chatroom);
    user.chatroomrequests.pull(chatroomID);
    user.chatrooms.push(chatroomID);
    chatroom.userData.set(userID,'accepted');
    // console.log(user,chatroom);
    await user.save();
    await chatroom.save();

    res.json({
        message:"Accepted"
    })
}