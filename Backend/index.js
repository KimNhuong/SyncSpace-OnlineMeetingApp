const express = require("express");
const dotenv = require("dotenv");
const app = express();
const UserRouter = require('./router/user');
dotenv.config();
const port = process.env.PORT; 

app.use(express.json());
app.use('/user',UserRouter);

require('./models/index');
app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
})
