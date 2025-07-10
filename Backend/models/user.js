const {Sequelize, Model, DataTypes, DATE} = require('sequelize');
const { now } = require('sequelize/lib/utils');
const sequelize = require('../models/connectDB');

const User = sequelize.define('user',{
    userID:{
        type: DataTypes.INTEGER,
        autoIncrement: true, 
    },
    name: 
    {   
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    passWord:
    {
        type: DataTypes.STRING,
    },
    email: 
    {
        types: DataTypes.STRING,
    },
    avatarUrl:
    {
        types: DataTypes.STRING, 
    },
    createdAt:{
        types: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        types: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},
    {
    sequelize,
});

module.exports = User; 
