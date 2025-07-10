const sequelize = require('./connectDB');
const User = require('./user');
const meetingRoom = require('./meetingRoom');
const Message = require('./message');
const userMeeting = require('./userMeeting');
const WhiteBoard = require('./whiteBoard');

require('./connectDB');
sequelize.sync({alter: true})
    .then(() => {
        console.log('Database Synced successfully ✅');
    })
    .catch((err) => {
        console.log(err);
    });