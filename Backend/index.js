const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createServer } = require("http");

const UserRouter = require("./router/user");
const MeetingRoomRouter = require("./router/meetingRoom");
const RoomRouter = require('./router/userMeeting');
const { initSocket } = require("./utils/realtime");

dotenv.config();
const port = process.env.PORT;

const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use("/user", UserRouter);
app.use("/meeting", MeetingRoomRouter);
app.use("/Room",RoomRouter);

require("./models/index");

// Khởi tạo socket.io
initSocket(server);

server.listen(port, () => {
  console.log(`Server + Socket.IO is listening on ${port}`);
});
