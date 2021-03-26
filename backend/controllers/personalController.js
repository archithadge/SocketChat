const mongoose=require('mongoose');
const PersonalMessage=mongoose.model('PersonalMessage');

exports.getPersonalMessages=async (req,res)=>{
    const chatroomID=req.body.chatroomId;
    console.log("Msg request to get messages of chatroom ",chatroomID);
    const msgs=await PersonalMessage.find({chatroom:chatroomID});
    res.json(msgs);
}