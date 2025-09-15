const express = require('express')
const router = express.Router();
const {JoinRoom} = require('../controllers/UserMeetingController');
const { verifyToken } = require('../middlewares/user');

//join
router.post('/signup',verifyToken,JoinRoom);


module.exports = router;