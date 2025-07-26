const User = require('../models/user');
const {hashPassword, existingUsername, getHashedPassword ,validatePassword} = require('../utils/user');

const HandleSignup = async (req,res) =>{
    const {name , userName, passWord, email, avatarUrl} = req.body;
    let existEmail = await User.findOne({ where: {email}  });
    if (existEmail){
       return res.status(404).send('Email already exist')
    } else {
        try{
        const HashedpassWord = await hashPassword(req.body.passWord);
        const newUser = await User.create({
            name,
            userName,
            passWord: HashedpassWord,
            email,
            avatarUrl
        });
        return res.status(201).json({
            message: 'Signup succesfully',
            user: newUser,
        })
    } catch (err){
        return res.status(404).send(err);
    }}
}

const Login = async (req,res) => {
    const {loginPassword, loginUsername} = req.body;
    const hash = await getHashedPassword(loginUsername);
    const result = await validatePassword(loginPassword, hash);
    try{
        if (existingUsername(loginUsername) == true){
            if (result){ 
                return res.status(201).json({
                message: 'login succesfully'
                    }
                )
            };
        } else 
            return res.status(404).send( 'wrong username or password' ); 
    } catch (err){
        console.log(err);
    }
}

module.exports = {HandleSignup, Login}