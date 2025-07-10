const {DataTypes, DATE} = require('sequelize');
const sequelize = require('./connectDB');
const meetingRoom = require('./meetingRoom');
const User = require('./user');

const WhiteBoard = sequelize.define(
    'WhiteBoard',
    {
        ActionID: {
            type: DataTypes.INTEGER, 
            allowNull: false, 
        },
        RoomID: {
            type: DataTypes.INTEGER, 
            references: {
                model: meetingRoom, 
                key: 'roomID'
            },
            primaryKey: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'userID'
            },
        },
        actionType: {
            type: DataTypes.ENUM('draw','erase')
        },
        timeStamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },{
        sequelize
    }
)

module.exports = WhiteBoard; 