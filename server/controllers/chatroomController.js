const mongoose=require('mongoose');
const Chatroom=mongoose.model('Chatroom');
const ChatroomMessage=mongoose.model('ChatroomMessage');

//To create a new public chatrooms
exports.createChatroom=async (req,res)=>{
    const {name}=req.body;
    const chatroomExists=await Chatroom.findOne({name});
    if(chatroomExists) throw "Already exists..!";
    const chatroom=new Chatroom({
        name,
    });
    await chatroom.save();

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