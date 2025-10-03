const express = require('express')
const router = express.Router();
const { verifyToken } = require('../middlewares/user');
const { saveMsg, getAllRoomMsg} = require('../controllers/MessageController');


//save msg when sent
router.post('/getMSG',verifyToken,saveMsg);
//get all Msg of joined room
router.get('/getMSG',verifyToken,getAllRoomMsg);

module.exports = router;