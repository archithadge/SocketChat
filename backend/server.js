/*
Validation remaining(Chatroom+user) 
*/
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (err) => {
    console.log("MongoDB error" + err.message);
});

mongoose.connection.once('open', (err) => {
    console.log("MongoDB connected");
})

require('./models/User');
require('./models/Chatroom');
require('./models/ChatroomMessage');
require('./models/PersonalMessage');
const app = require('./app');



const server = app.listen(process.env.PORT, () => {
    console.log("Server started at port " + process.env.PORT);
})

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const jwt = require('jwt-then');
const Chatroom = require('./models/Chatroom');
const ChatroomMessage = mongoose.model('ChatroomMessage');
const User = mongoose.model('User');
const PersonalMessage = mongoose.model('PersonalMessage');

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.UID = payload.id;
        next();
    } catch (err) {
        
    }
});

io.on('connection',  (socket) => {

    console.log(socket.id + " connected");

    socket.on('disconnect', () => {
        console.log(socket.id + " disconnected");
        socket.disconnect();
    })

    socket.on('initialize', async () => {
        socket.join(socket.UID);
        const chatrooms = await Chatroom.find({}, { _id: 1 });
        for(i=0;i<chatrooms.length;i++){
            console.log('Initialising sockets...',(chatrooms[i]._id).toString());
            socket.join(chatrooms[i]._id.toString());
        }
        
    })

    socket.on('leaveRooms', async () => {
        console.log('Leave fired')
        socket.leave(socket.UID);
        const chatrooms = await Chatroom.find({}, { _id: 1 });
        for(i=0;i<chatrooms.length;i++){
            console.log('Leaving rooms...',chatrooms[i]._id);
            socket.leave(chatrooms[i]._id);
        }
        
        
    })

    socket.on('chatroomMessage',async ({chatroomId,message})=>{
        
        console.log(chatroomId.toString(),message);
        console.log(socket.rooms)
        const user=await User.findOne({_id:socket.UID});
        const msg=new ChatroomMessage({
            chatroom:chatroomId,
            user:socket.UID,
            message:message
        })
        io.to(chatroomId).emit('newMessage',{
            message:message,
            name:user.name,
            userId:user._id,
            chatroom:chatroomId
        })
        await msg.save();
    })

        socket.on('personalMessage',async ({receiverId,chatroom,message})=>{
        
        const user=await User.findOne({_id:socket.UID});
        const msg=new PersonalMessage({
            sender:socket.UID,
            receiver:receiverId,
            chatroom:chatroom,
            message:message
        })
        io.to(socket.UID).to(receiverId).emit('newMessage',{
            message:message,
            name:user.name,
            userId:user._id,
            receiver:receiverId
        })
        await msg.save();
    })


})
















































// io.use(async (socket,next)=>{
//     try{
//         const token=socket.handshake.query.token;
//         const payload=await jwt.verify(token,process.env.SECRET);
//         socket.userId=payload.id;
//         next();
//     }catch(err){

//     }
// });



// io.on('connection',(socket)=>{
//     // const token=socket.handshake.query.token;

//     // console.log("All sockets->",io.sockets.sockets)
//     // l.push(socket.id);
//     // console.log("All sockets ",l);
//     // c=c+1;
//     // console.log('c',c);
//     console.log("Connected "+socket.id);

//     socket.on('disconnect',()=>{
//         socket.disconnect();
//         // c=c-1;
//     // console.log('c',c);
//         console.log("Disconnected "+socket.id);
//     })

//     socket.on('joinRoom',({chatroomId})=>{
//         socket.join(chatroomId);
//         console.log(socket.userId+" has joined chatroom "+chatroomId);
//     })

//     socket.on('leaveRoom',({chatroomId})=>{
//         socket.leave(chatroomId);
//         console.log(socket.userId+" has left chatroom "+chatroomId);
//     })

//     socket.on('chatroomMessage',async ({chatroomId,message})=>{
//         console.log('Message arrived< ',message," >from ",socket.userId);
//         const user=await User.findOne({_id:socket.userId});
//         const msg=new ChatroomMessage({
//             chatroom:chatroomId,
//             user:socket.userId,
//             message:message
//         })
//         io.to(chatroomId).emit('newMessage',{
//             message:message,
//             name:user.name,
//             userId:user._id,
//         })
//         await msg.save();
//     })

//     socket.on('personalMessage',async ({receiverId,chatroom,message})=>{
//         console.log('Message arrived< ',message," >from ",socket.userId);
//         const user=await User.findOne({_id:socket.userId});
//         const msg=new PersonalMessage({
//             sender:socket.userId,
//             receiver:receiverId,
//             chatroom:chatroom,
//             message:message
//         })
//         io.to(chatroom).emit('newMessage',{
//             message:message,
//             name:user.name,
//             userId:user._id,
//         })
//         await msg.save();
//     })
// })