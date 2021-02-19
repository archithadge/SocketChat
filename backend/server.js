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

const io=require('socket.io')(server);

io.use(async (socket,next)=>{
    const token=socket.handshake.query.token;
})