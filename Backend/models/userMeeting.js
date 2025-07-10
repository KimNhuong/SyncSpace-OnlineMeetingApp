const {Sequelize,DataTypes,Model} = require ('sequelize');
const sequelize = require('../models/connectDB');
const User = require('../models/user');
const meetingRoom = require('./meetingRoom');

const userMeeting = sequelize.define(
    'userMeeting',
    {
        userMeetingID:{
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true, 
        },
        userID:{
            type: DataTypes.INTEGER,
            references: {
                model: User, 
                key: 'userID', 
            }
        },
        RoomID:{
            type: DataTypes.INTEGER,
            references: {
                model: meetingRoom,
                key: 'roomID',
            }
        },
        joinTime:{
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW, 
        },
        leaveTime:{
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW,
        },
        role:{
            type: DataTypes.ENUM('HOST','PARTICIPANT')
        },
        isBanned:{
          type: DataTypes.BOOLEAN,   
        },
    },{
        sequelize,
    }
);

module.exports = userMeeting; 