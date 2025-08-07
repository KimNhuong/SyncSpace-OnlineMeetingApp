const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function verifyToken(req,res,next){
    const token = req.headers['authorization'];
    const fulltoken = token && token.split(' ')[1];

    if (!fulltoken) return res.status(401);

    try {
        const decoded = await jwt.verify(fulltoken, process.env.JWT_SECRET);
        if (decoded!=null){
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