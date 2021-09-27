import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useSound from "use-sound";
import boopSfx1 from "../Sounds/recieve.mp3";
import boopSfx2 from "../Sounds/send.mp3";
import UsersComponent from "./Components/UsersComponent";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ChatroomsComponent from "./Components/ChatroomsComponent";
import MessagesComponent from "./Components/MessagesComponent";
import SocketIOFileUpload from 'socketio-file-upload';


const drawerWidth = 286;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer({ socket, history }, props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [ispublic, setPublic] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatName, setCurrentChatName] = useState(null);
  const [chatrooms, setChatrooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesFromDB, setMessagesDB] = useState([]);
  const messageRef = React.useRef();
  const [recieve] = useSound(boopSfx1);
  const [send] = useSound(boopSfx2);
  const scrollRef = React.useRef(null);
  

  const setChat = (currentChat, ispublic, currentChatName) => {
    setCurrentChat(currentChat);
    setPublic(ispublic);
    setCurrentChatName(currentChatName);
  };

  const generateId = (id1, id2) => {
    var elements = [id1, id2];
    var a = elements.sort((a, b) => a.localeCompare(b));
    
    return a[0] + a[1];
  };

  const sendMessage = () => {
    

    if (socket) {
      
      socket.emit("chatroomMessage", {
        chatroomId: currentChat,
        message: messageRef.current.value,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("uid");
    socket.off();
    socket.disconnect();
    history.push("/login");
  };

  const sendMessageP = () => {


    if (socket) {
      socket.emit("personalMessage", {
        receiverId: currentChat,
        chatroom: generateId(localStorage.getItem("uid"), currentChat),
        message: messageRef.current.value,
      });
    }
  };

  React.useEffect(() => {
    if (!socket) return;
    socket.once("newMessage", (message) => {
      if (message.userId == localStorage.getItem("uid")) {
        send();
      } else {
        recieve();
      }
      console.log(message,localStorage.getItem("uid"))
      if (
        (ispublic && message.chatroom == currentChat) || (ispublic==false && (currentChat==message.userId || message.userId==localStorage.getItem('uid')))
        
      ) {
        const newMessages = [...messages, message];

        setMessages(newMessages);
      }
      
    });

    return function cleanup() {
      socket.off("newMessage");
    };
  });

  const getMessagesFromDBP = () => {
    axios
      .post(
        "http://localhost:8000/personal/messages",
        {
          chatroomId: generateId(localStorage.getItem("uid"), currentChat),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((response) => {
        setMessagesDB(response.data);
      })
      .catch((error) => {
      });
  };

  const getMessagesFromDB = () => {
    axios
      .post(
        "http://localhost:8000/chatroom/messages",
        {
          chatroomId: currentChat,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((response) => {
        setMessagesDB(response.data);
      })
      .catch((error) => {
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:8000/user/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        setTimeout(getUsers, 10000);
      });
  };

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 10000);
      });
  };


  React.useEffect(() => {
    getChatrooms();
    getUsers();
  }, []);

  React.useEffect(() => {
    if (!socket) return;
    socket.emit("initialize");
  }, [socket]);

  React.useEffect(() => {
    console.log("public ", ispublic, " currentChat ", currentChat);
    if (ispublic == true) {
      getMessagesFromDB();
    }
    if (ispublic == false) {
      getMessagesFromDBP();
    }
    setMessages([]);
  }, [currentChat]);

  React.useEffect(() => {
    if (scrollRef) {
      scrollRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ChatroomsComponent chatrooms={chatrooms} setChat={setChat} />
      </List>
      <Divider />
      <List>
        <UsersComponent users={users} setChat={setChat} />
      </List>
      <Divider/>
      <button onClick={logout}>LogOut</button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {currentChatName}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{ padding: "0px" }}>
        <div className={classes.toolbar} />
        <div
          style={{
            backgroundColor: "#e3ffc4",
            overflowY: "scroll",
            height: "84vh",
          }}
          ref={scrollRef}
        >
          <MessagesComponent messages={messagesFromDB} />
          <MessagesComponent messages={messages} />
        </div>

        <input style={{ height: "4vh", width: "84%" }} ref={messageRef}></input>
        
        <button
          style={{ width: "16%" }}
          onClick={() => {
            if (ispublic) {
              sendMessage();
            } else {
              sendMessageP();
            }
          }}
        >
          Send
        </button>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
