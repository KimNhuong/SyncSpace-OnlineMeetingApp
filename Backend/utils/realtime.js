const { Server } = require("socket.io");

let io; 

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // frontend
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("sendMessage", (data) => {
      console.log("Message received:", data);
      io.emit("message", data); 
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io has not been initialized!");
  }
  return io;
}

module.exports = { initSocket, getIO };
