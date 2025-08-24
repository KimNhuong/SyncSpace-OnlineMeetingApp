const express = require("express");
const dotenv = require("dotenv");
const app = express();
const UserRouter = require('./router/user');
const MeetingRoomRouter = require('./router/meetingRoom');
dotenv.config();
const port = process.env.PORT; 
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000", // cho phép frontend React
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use('/user',UserRouter);
app.use('./meeting',MeetingRoomRouter);


require('./models/index');
app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})
