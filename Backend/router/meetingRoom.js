const express = require('express')
const router = express.Router();
const {verifyToken} = require('../middlewares/user');
const { CreateRoom } = require('../controllers/MeetingRoomController');

router.post('/CreateMeeting',verifyToken,CreateRoom);

module.exports = router;