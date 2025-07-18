const express = require('express')
const router = express.Router();
const HandleSignup = require('../controllers/UserController');

//signUP
router.post('/signup',HandleSignup);

module.exports = router;