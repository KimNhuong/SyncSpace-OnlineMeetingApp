const express = require("express");
const dotenv = require("dotenv");
const app = express();
const UserRouter = require('./router/user');
const MeetingRoomRouter = require('./router/meetingRoom');
dotenv.config();
const port = process.env.PORT; 
const cors = require("cors");
const {createServer} = require('http');
const {Server} = require('socket.io');


const server = createServer(app);
const io = new Server(server,  {
  cors: {
    origin: "http://localhost:3000", // địa chỉ frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:3000", // cho phép frontend React
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use('/user',UserRouter);
app.use('./meeting',MeetingRoomRouter);


require('./models/index');
// app.listen(port, ()=>{
//     console.log(`App is listening on ${port}`);
// })

io.on('connection',(socket) => {
    console.log('user connected');
    socket.on('disconnect', ()=> {
      console.log('user disconnected');
    })
})

server.listen(port,()=> {
  console.log(`Server socket is listening on ${port}`)
})