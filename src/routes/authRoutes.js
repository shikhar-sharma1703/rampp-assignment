const express = require('express');
const passport = require('passport');
const router = express.Router();

const { googleLogin, googleCallback, logout } = require('../controller/Auth/authRoutes');

router.get('/google/login', googleLogin);
router.get('/google/callback', googleCallback);
router.get('/logout', logout);

module.exports = router;
