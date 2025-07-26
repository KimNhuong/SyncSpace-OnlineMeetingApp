const express = require('express')
const router = express.Router();
const {HandleSignup, Login} = require('../controllers/UserController');

//signUP
router.post('/signup',HandleSignup);
//login
router.post('/login',Login);

module.exports = router;