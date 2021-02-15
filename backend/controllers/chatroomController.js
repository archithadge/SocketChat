const mongoose=require('mongoose');
const Chatroom=mongoose.model('Chatroom');

exports.createChatroom=async (req,res)=>{
    const {name}=req.body;
    console.log(req.payload)

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