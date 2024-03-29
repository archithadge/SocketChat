# SocketChat
## Introduction 
This is a **development** version of a realtime chatapp. 

This chatapp supports one-to-one as well as group chats. It's built with **MERN Stack** and **SocketIO**. It enables registration, authentication of users, creating chatrooms, send and receive group as well as personal messages.
<p>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
<img src="Assets/1.png"/>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="Assets/2.png"/>
</p>
<p>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
<img src="Assets/3.png"/>
  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
  <img src="Assets/4.png"/>
</p>

<p>
<img src="Assets/5.png"/>
</p>



## Key Features
<ol>
  <li>Realtime personal/group messaging</li>
  <li>JWT based authentication</li>
  <li>Server-side caching using Redis</li>
  <li>Add/Delete members in chatroom</li>
  <li>File Sharing</li>
  <li>Delete Messages</li>
  <li>NLP based abuse detection/removal, ban/suspend users based on decision.</li>
  <li>Responsive UI</li>
  </ol>

## Installation (Development)
To **install the client**, navigate to client and run

```
npm install
```

To **install the server**, navigate to server and run

```
npm install
```

To **start the client**, navigate to client and run

```
npm start
```

To **start the server**, navigate to server and run

```
npm start
```

Also make sure to add `.env` file in `server` with the following environment variables.

```
PORT=8000
ENV=DEVELOPMENT
DATABASE=<Local mongodb url>
ATLAS=<MongoDB Atlas URL>
SALT=<SALT>
SECRET=<SECRET>
```
