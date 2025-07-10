const { DataTypes, ENUM} = require('sequelize');
const sequelize = require('../models/connectDB');
let randomstring = require('randomstring');
const User = require('./user');

const meetingRoom = sequelize.define(
    'meetingRoom',{   
    roomID: 
    {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roomCode:{
        type: DataTypes.STRING, 
        defaultValue: randomstring.generate(8),
    },
    capacity:{
        type: DataTypes.INTEGER,
        defaultValue: 8, 
    },
    creatorID:{
        type: DataTypes.INTEGER,
        references:
        {
            model: User,
            key: 'userID',
        }
    },
    status:{
        type: ENUM('Active','Ended'),
        allowNull: false, 
    },
    createdAt:{
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
    },
    endedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},
    {
        sequelize, 
})

module.exports = meetingRoom;
