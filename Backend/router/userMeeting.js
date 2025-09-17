const express = require('express')
const router = express.Router();
const {JoinRoom} = require('../controllers/UserMeetingController');
const { verifyToken } = require('../middlewares/user');

//join
router.post('/Join',verifyToken,JoinRoom);


module.exports = router;