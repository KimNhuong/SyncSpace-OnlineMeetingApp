const { Server } = require("socket.io");
const RoomHandler = require("./RoomHandler");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    connectionStateRecovery: {
    maxDisconnectionDuration: 10 * 60 * 1000,
    skipMiddlewares: true,
  }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // Đăng ký tất cả các handler từ file khác
    RoomHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

function getIO() {
  if (!io) throw new Error("Socket.io has not been initialized!");
  return io;
}

module.exports = { initSocket, getIO };
