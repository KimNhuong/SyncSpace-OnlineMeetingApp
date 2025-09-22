function RoomHandler(io, socket) {
  // khi join room
  socket.on("JoinRoom", ({ code }) => {
    socket.join(code);
    console.log(`User ${socket.id} joined room ${code}`);
  });

  // khi gửi message
  socket.on("SendMessage", ({ code, message }) => {
    io.to(code).emit("roomMessage", {
      sender: socket.id,
      message,
    });
  });
}

module.exports = RoomHandler;
