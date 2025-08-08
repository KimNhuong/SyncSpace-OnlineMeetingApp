const express = require("express");
const dotenv = require("dotenv");
const app = express();
const UserRouter = require('./router/user');
const MeetingRoomRouter = require('./router/meetingRoom');
dotenv.config();
const port = process.env.PORT; 

app.use(express.json());
app.use('/user',UserRouter);
app.use('./meeting',MeetingRoomRouter);

require('./models/index');
app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})
