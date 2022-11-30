const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
var util = require("util");

const {
  addUser,
  removeUser,
  getUserBySocketId,
  getUsers,
  updateUserRoom,
  getUserById,
} = require("./controller/user-controller");
const { getUsersInRoom, addRoom } = require("./controller/room-controller");

const { createServer } = require("http");
const { Server } = require("socket.io");

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
    getUserBySocketId(socket.id)
      .then((currentUser) => {
        if (!currentUser) {
          return addUser(name, socket.id);
        }
        return getUserBySocketId(socket.id);
      })
      .then((userData) => {
        const userRooms = userData.rooms;
        if (!userRooms.filter((availableRoom) => availableRoom === room)[0]) {
          return addRoom(room, userData.id).then((roomData) =>
            updateUserRoom(userData.id, roomData.id)
          );
        }
        return userData;
      })
      .then((userData) => {
        socket.emit("joinMessage", {
          user: "admin",
          text: `${userData.name}, welcome to room ${room}`,
        });
        socket.broadcast.emit("joinMessage", {
          user: "admin",
          text: `${userData.name}, has joined.`,
        });
        socket.join(room);
      })
      .then(() => getUsersInRoom(room))
      .then((usersInRoom) => {
        console.log(usersInRoom, "Room Data w/ user data populated");
        return usersInRoom;
      })
      .then((users) => {
        console.log(users, " - - - - USR ARR - - -");
        io.to(room).emit("roomData", {
          room: room,
          users: users,
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
