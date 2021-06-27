const mongoose=require('mongoose');
const Chatroom=mongoose.model('Chatroom');
const User=mongoose.model('User');
const ChatroomMessage=mongoose.model('ChatroomMessage');

//To create a new public chatrooms
exports.createChatroom=async (req,res)=>{
    const {name}=req.body;
    const chatroomExists=await Chatroom.findOne({name});
    console.log("payload ",req.payload);
    if(chatroomExists) throw "Already exists..!";
    const chatroom=new Chatroom({
        name,
        creator:req.payload.id,
        userData:{}
    });
    chatroom.userData.set(req.payload.id,'accepted');
    await chatroom.save(async (err,data)=>{
       const user=await User.findOne({_id:req.payload.id});
       user.chatrooms.push(data._id);
       user.save();
    });
    

    res.json({
        message:"Chatroom created successfully",
    })

}

//To get all public chatrooms
exports.getAllChatrooms=async (req,res)=>{
    const chatrooms=await Chatroom.find({});
    res.json(chatrooms)
}

//To get all messages in chatroom
exports.getChatroomMessages=async (req,res)=>{
    const chatroomID=req.body.chatroomId;
    console.log("Msg request to get messages of chatroom ",chatroomID);
    const msgs=await ChatroomMessage.find({chatroom:chatroomID});
    res.json(msgs);
}

exports.addmemberrequest=async (req,res)=>{
    const creatorID=req.payload.id;
    const chatroomID=req.body.chatroomID;
    const memberID=req.body.memberID;

    // console.log(chatroomID);
    const chatroom=await Chatroom.findOne({_id:chatroomID});
    if(!chatroom)throw "Chatroom doesn't exist";

    const map=chatroom.userData;
    // console.log(map);

    if(chatroom.userData.get(memberID))throw "Already sent..!";
    chatroom.userData.set(memberID,'requested');

    const member=await User.findOne({_id:memberID});
    member.chatroomrequests.push(chatroomID);
    console.log(member);

    chatroom.save();
    member.save();

    res.json({
        message:'requested'
    })
}



