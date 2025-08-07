const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    const fulltoken = token && token.split(' ')[1];
    const decoded = await jwt.verify(fulltoken, process.env.JWT_SECRET);
    try {
        if (decoded!=null){
            return res.status(201).json({
                message: 'oke'
            });
            req.user = decoded;
            next();
        } else return res.status(401).json({
            message: 'unauth'
        }
        )
    } catch (err) {
        console.log(err);
    }
}

module.exports = {verifyToken};