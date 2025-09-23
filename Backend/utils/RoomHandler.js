function RoomHandler(io, socket) {
  // khi join room
  socket.on("JoinRoom", ({ code }) => {
    socket.join(code);
    console.log(`User ${socket.id} joined room ${code}`);

    if (socket.recoverd){

    } else {
      
    }


  });

  // khi gửi message
  socket.on("SendMessage", ({ code, message, sender }) => {
    io.to(code).emit("roomMessage", {
      sender: sender,
      message,
    });
  });



}

module.exports = RoomHandler;
