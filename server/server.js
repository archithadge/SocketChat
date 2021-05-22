require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jwt-then");

//MongoDB Connection
mongoose.connect(process.env.ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB error" + err.message);
});
mongoose.connection.once("open", (err) => {
  console.log("MongoDB connected");
});

//Importing database models
require("./models/User");
require("./models/Chatroom");
require("./models/ChatroomMessage");
require("./models/PersonalMessage");
const Chatroom = require("./models/Chatroom");
const ChatroomMessage = mongoose.model("ChatroomMessage");
const User = mongoose.model("User");
const PersonalMessage = mongoose.model("PersonalMessage");

//Importing the express app
const app = require("./app");
const server = app.listen(process.env.PORT, () => {
  console.log("Server started at port " + process.env.PORT);
});

//SocketIO-server
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//SocketIO middleware to verify each event from client
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.UID = payload.id;
    next();
  } catch (err) {}
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  //Client disconnection event
  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
    socket.disconnect();
  });

  //On User Login, client socket joins all public chatrooms(for public chatroom messages) and a private room(for private messages)
  socket.on("initialize", async () => {
    //Private room
    socket.join(socket.UID);
    const chatrooms = await Chatroom.find({}, { _id: 1 });
    //Public chatrooms
    for (i = 0; i < chatrooms.length; i++) {
      console.log("Initialising sockets...", chatrooms[i]._id.toString());
      socket.join(chatrooms[i]._id.toString());
    }
  });

  //To leave all the rooms
  socket.on("leaveRooms", async () => {
    console.log("Leave fired");
    socket.leave(socket.UID);
    const chatrooms = await Chatroom.find({}, { _id: 1 });
    for (i = 0; i < chatrooms.length; i++) {
      console.log("Leaving rooms...", chatrooms[i]._id);
      socket.leave(chatrooms[i]._id);
    }
  });

  // On public chatroom message
  socket.on("chatroomMessage", async ({ chatroomId, message }) => {
    const user = await User.findOne({ _id: socket.UID });
    const msg = new ChatroomMessage({
      chatroom: chatroomId,
      user: socket.UID,
      message: message,
      name: user.name,
    });
    //Broadcast the message to all connected clients in that chatroom
    io.to(chatroomId).emit("newMessage", {
      message: message,
      name: user.name,
      userId: user._id,
      chatroom: chatroomId,
    });
    //Save message to database
    await msg.save();
  });

  //On private message
  socket.on("personalMessage", async ({ receiverId, chatroom, message }) => {
    const user = await User.findOne({ _id: socket.UID });
    const msg = new PersonalMessage({
      sender: socket.UID,
      name: user.name,
      receiver: receiverId,
      chatroom: chatroom,
      message: message,
    });
    // Broadcast message to private chatroom of the reciever
    io.to(socket.UID).to(receiverId).emit("newMessage", {
      message: message,
      name: user.name,
      userId: user._id,
      receiver: receiverId,
    });
    await msg.save();
  });
});

