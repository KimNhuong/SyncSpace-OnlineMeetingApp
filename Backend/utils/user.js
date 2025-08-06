const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

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


module.exports = {hashPassword, existingUsername, validatePassword, getHashedPassword};