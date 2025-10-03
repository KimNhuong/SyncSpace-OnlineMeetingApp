function RoomHandler(io, socket) {
  let currentRoom = null;

  // Khi join room
  socket.on("JoinRoom", ({ code }) => {
    socket.join(code);
    currentRoom = code;
    console.log(`User ${socket.id} joined room ${code}`);

    // Thông báo cho tất cả người khác trong room rằng có người mới kết nối
    socket.to(code).emit("user-connected", socket.id);
  });

  // Khi gửi message
  socket.on("SendMessage", ({ code, message, sender }) => {
    io.to(code).emit("roomMessage", {
      sender,
      message,
    });
  });

  // Khi nhận tín hiệu WebRTC từ frontend
  socket.on("signal", ({ to, signal }) => {
    io.to(to).emit("signal", { from: socket.id, signal });
  });

  // Khi người dùng rời room hoặc disconnect
  socket.on("disconnect", () => {
    if (currentRoom) {
      socket.to(currentRoom).emit("user-disconnected", socket.id);
    }
  });
}

module.exports = RoomHandler;
