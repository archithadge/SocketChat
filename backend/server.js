/*
Validation remaining(Chatroom+user) 
*/
require('dotenv').config();
const mongoose=require('mongoose');
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('error',(err)=>{
    console.log("MongoDB error"+err.message);
});

mongoose.connection.once('open',(err)=>{
    console.log("MongoDB connected");
})

require('./models/User');
require('./models/Chatroom');
require('./models/Message');
const app=require('./app');



const server=app.listen(process.env.PORT,()=>{
    console.log("Server started at port "+process.env.PORT);
})

const io=require('socket.io')(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
const jwt=require('jwt-then');
const Message=mongoose.model('Message');
const User=mongoose.model('User');

io.use(async (socket,next)=>{
    try{
        const token=socket.handshake.query.token;
        const payload=await jwt.verify(token,process.env.SECRET);
        socket.userId=payload.id;
        next();
    }catch(err){

    }
});

io.on('connection',(socket)=>{
    // const token=socket.handshake.query.token;
    console.log("Connected "+socket.userId);

    socket.on('disconnect',()=>{
        console.log("Disconnected "+socket.userId);
    })

    socket.on('joinRoom',({chatroomId})=>{
        socket.join(chatroomId);
        console.log("User has joined chatroom "+chatroomId);
    })

    socket.on('leaveRoom',({chatroomID})=>{
        socket.leave(chatroomID);
        console.log("User has left chatroom "+chatroomID);
    })

    socket.on('chatroomMessage',async ({chatroomId,message})=>{
        console.log('message arrived',message,"from",socket.userId);
        const user=await User.findOne({_id:socket.userId});
        console.log("await",user);
        const msg=new Message({
            chatroom:chatroomId,
            user:socket.userId,
            message:message
        })
        io.to(chatroomId).emit('newMessage',{
            message:message,
            name:user.name,
            userId:user._id,
        })
        await msg.save();
    })
})