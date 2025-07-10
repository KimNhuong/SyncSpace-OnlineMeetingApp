const {DataTypes, DATE} = require('sequelize');
const { now } = require('sequelize/lib/utils');
const sequelize = require('../models/connectDB');

const User = sequelize.define('user',{
    userID:{
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
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
        type: DataTypes.STRING,
    },
    avatarUrl:
    {
        type: DataTypes.STRING, 
    },
    createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},
    {
    sequelize,
});

module.exports = User; 
