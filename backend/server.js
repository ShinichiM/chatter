const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { addUser, getUser, getUsersInRoom, removeUser } = require("./User");

app.use(cors());

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("join", ({ name, room }) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    socket.emit("joinMessage", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast("joinMessage", {
      user: admin,
      text: `${user.name}, has joined.`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
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
