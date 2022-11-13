const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require("cors");

const { createServer } = require("http");
// const server = http.createServer(app);
const { Server } = require("socket.io");

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
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

httpServer.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
