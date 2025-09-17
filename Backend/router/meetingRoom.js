const express = require('express')
const router = express.Router();
const {verifyToken} = require('../middlewares/user');
const { CreateRoom,EndRoom,FindAllRoom } = require('../controllers/MeetingRoomController');

router.post('/CreateMeeting',verifyToken,CreateRoom);
router.post('/EndRoom',verifyToken,EndRoom);
router.get('/FindAllRoom',verifyToken,FindAllRoom);

module.exports = router;