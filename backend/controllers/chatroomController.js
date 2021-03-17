const mongoose=require('mongoose');
const Chatroom=mongoose.model('Chatroom');
const Message=mongoose.model('Message');

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

exports.getAllChatrooms=async (req,res)=>{
    const chatrooms=await Chatroom.find({});
    res.json(chatrooms)
}

exports.getChatroomMessages=async (req,res)=>{
    const chatroomID=req.body.chatroomId;
    console.log("Msg request to get messages of chatroom ",chatroomID);
    const msgs=await Message.find({chatroom:chatroomID});
    res.json(msgs);
}