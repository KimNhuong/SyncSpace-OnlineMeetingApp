const {DataTypes} = require('sequelize');
const sequelize = require('./connectDB'); 
const User = require('./user');
const meetingRoom = require('./meetingRoom');

const Message = sequelize.define(
    'Message',
    {
        roomID:{
            type: DataTypes.INTEGER,
            references:{
                model: meetingRoom,
                key: 'roomID'
            }
        },
        SeenderID:{
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'userID',
            }
        },
        content:{
            type: DataTypes.STRING, 
        },
        timeStamp:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, 
        } 
    },{
        sequelize
    }
)

module.exports = Message;