const sequelize = require('../models/connectDB');
const userMeeting = require('../models/userMeeting');
const { getIO } = require('../utils/realtime');
const meetingRoom = require('../models/meetingRoom');

const io = getIO();

const getCurrentRoomCode = async (userID) => {
    try {
        const userInMeeting = await userMeeting.findOne({
            where: { userID },
        });

        if (!userInMeeting) return null; 
        const room = await meetingRoom.findOne({
            where: { RoomID: userInMeeting.RoomID },
        });

        if (!room) return null; 
        return room.RoomID;

    } catch (e) {
        console.error('Error getting room code:', e);
        return null;
    }
};

const roomCode = await getCurrentRoomCode(user.id);

const initMessageSocket = () => {
    io.on('connection', async (socket) => {
        console.log('User connected');

        // --- 1️⃣ Nhận token từ client ---
        const token = socket.handshake.auth.token;
        if (!token) {
            socket.disconnect(); // không có token thì disconnect
            return;
        }

        let user;
        try {
            user = verifyToken(token); // decode token, tương tự middleware HTTP
            socket.user = user;
        } catch (err) {
            console.log('Invalid token:', err.message);
            socket.disconnect();
            return;
        }

        if (roomCode) {
            socket.join(roomCode); 
            console.log(`User ${user.id} joined room ${roomCode}`);
        } else {
            console.log(`User ${user.id} is not in any room`);
        }

        // --- 3️⃣ Lắng nghe gửi tin nhắn ---
        socket.on('sendMessage', async (data) => {
            const roomCode = await getCurrentRoomCode(user.id); 
            if (roomCode) {
                io.to(roomCode).emit('message', {
                    userID: user.id,
                    text: data.text,
                    timestamp: new Date()
                });
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = { initMessageSocket };

