const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
var util = require("util");

const {
  createUser,
  removeUser,
  getUserByName,
  getUsers,
  updateUserRoom,
  getUserById,
} = require("./controller/user-controller");
const {
  getUsersInRoom,
  createRoom,
  getRoom,
  getRoomByRoomNumber,
} = require("./controller/room-controller");

const { createServer } = require("http");
const { Server } = require("socket.io");
const { createBrotliCompress } = require("zlib");

const mongoDB = `mongodb+srv://admin:${process.env.MONGODB_USER_PW}@cluster0.a98jphv.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.error(err));

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("join", ({ name, room }) => {
    const currentUser = getUserByName(name).then((currentUser) => {
      if (!currentUser) {
        return createUser(name, socket.id);
      }
      return currentUser;
    });
    const currentRoom = getRoomByRoomNumber(room).then((roomData) => {
      // check if room exists in DB
      let existingRoom = false;
      roomData.forEach((savedRoom) => {
        if (savedRoom.number === String(room)) existingRoom = true;
      });

      // create Room
      if (!existingRoom) {
        return createRoom(room, currentUser.id);
      }
      // return existing room
      return roomData.filter((existingRoom) => existingRoom.number === room)[0];
    });

    socket.emit("joinMessage", {
      user: "admin",
      text: `${name}, welcome to room ${room}`,
    });
    socket.broadcast.emit("joinMessage", {
      user: "admin",
      text: `${name}, has joined.`,
    });

    Promise.all([currentUser, currentRoom]).then((data) => {
      const userData = data[0];
      const roomData = data[1];
      const userHasRoom = userData.rooms.filter(
        (existingRoom) => existingRoom === room
      )[0];
      roomData.users.push(userData.id);
      roomData.save();
      if (!userHasRoom) {
        userData.rooms.push(roomData.id);
        userData.save();
      }
      socket.join(room);
      io.to(room).emit("roomData", {
        room: room,
        users: roomData.users,
      });
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUserBySocketId(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// addUser({ id: socket.id, name, room })
// const { user } = addUser({ id: socket.id, name, room });

// const currrentUsers = getUsersInRoom();
// console.log(currrentUsers);

// socket.emit("joinMessage", {
//   user: "admin",
//   text: `${user.name}, welcome to room ${user.room}.`,
// });
// socket.broadcast.emit("joinMessage", {
//   user: "admin",
//   text: `${user.name}, has joined.`,
// });

// socket.join(user.room);

// io.to(user.room).emit("roomData", {
//   room: user.room,
//   users: getUsersInRoom(user.room),
// });
