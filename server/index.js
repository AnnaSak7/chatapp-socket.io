import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

const PORT = 5050;

// communicate with client side
io.on("connection", (socket) => {
  console.log("a user connected");

  // listen for message from client
  socket.on("send_message", (data) => {
    console.log(data);

    // send message to all clients
    io.emit("received_message", data);
  });

  socket.on * "disconnect",
    () => {
      console.log("user disconnected");
    };
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
