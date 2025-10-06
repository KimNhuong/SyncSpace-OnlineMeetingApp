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
  socket.on("SendMessage", async ({ code, message, sender }) => {
    // Emit cho tất cả client trong room, kể cả người gửi
    io.to(code).emit("roomMessage", {
      sender,
      message,
    });
    // Lưu vào DB qua API nội bộ
    try {
      const Message = require('../models/message');
      const User = require('../models/user');
      const Room = require('../models/meetingRoom');
      const userObj = await User.findOne({ where: { username: sender } });
      const roomObj = await Room.findOne({ where: { roomCode: code } });
      if (userObj && roomObj) {
        await Message.create({
          roomID: roomObj.id,
          SeenderID: userObj.id,
          content: message,
        });
      }
    } catch (e) {
      console.log('Lỗi lưu message vào DB:', e);
    }
  });
  // Đồng bộ canvas realtime, emit cho tất cả client trong room (kể cả người gửi)
 // Đồng bộ canvas realtime, emit cho tất cả client TRỪ người gửi
    socket.on("draw", ({ data, code }) => {
      socket.to(code).emit("draw", { data });
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
