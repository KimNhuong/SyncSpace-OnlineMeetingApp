const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config();

async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
}

async function existingUsername(username){
    const existing = await User.findOne(
        {  where: { userName: `${username}`  }});
    if (existing != null) return await true;
    else return await false;
} 

async function getHashedPassword(username) {
    const user = await User.findOne({
        where: { userName: username },
        attributes: ['passWord'] 
    });
    if (!user) return null;
    return user.passWord; 
}

async function validatePassword (password,hash) {
    const result = await bcrypt.compare(password, hash);
    return result; 
}

function generateToken(user) {
    return jwt.sign(
        {   
            id: user.userID,
            username: user.userName,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
}

module.exports = {hashPassword, existingUsername, validatePassword, getHashedPassword, generateToken};