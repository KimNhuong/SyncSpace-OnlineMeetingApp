const express = require('express')
const router = express.Router();
const {HandleSignup, Login, ForgotPassword, UserExist} = require('../controllers/UserController');

//signUP
router.post('/signup',HandleSignup);
//login
router.post('/login',Login);
//reset password
router.post('/resetpassword',ForgotPassword);
//check if User exist
router.post('/exist',UserExist);

module.exports = router;