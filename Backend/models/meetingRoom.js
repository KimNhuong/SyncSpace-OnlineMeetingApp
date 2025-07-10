const {Sequelize, DataTypes, Model, ENUM} = require('sequelize');
const sequelize = require('../models/connectDB');
let randomstring = require('randomstring');
const User = require('./user');

const meetingRoom = sequelize.define(
    'meetingRoom',{   
    roomID: 
    {
        types: DataTypes.INTEGER,
        autoIncrement: true,
    },
    roomCode:{
        types: DataTypes.STRING, 
        defaultValue: randomstring.generate(8),
    },
    capacity:{
        types: DataTypes.INTEGER,
        defaultValue: 8, 
    },
    creatorID:{
        types: DataTypes.INTEGER,
        references:
        {
            model: User,
            key: 'userID',
        }
    },
    status:{
        types: ENUM('Active','Ended'),
        allowNull: false, 
    },
    createdAt:{
        types: DataTypes.DATE, 
        defaultValue: DataTypes.NOW,
    },
    endedAt:{
        types: DataTypes.DATE,
    }
},
    {
        sequelize, 
})

module.exports = meetingRoom;
