const express = require('express');
const {SignUpuser, Loginuser} = require('../controller/usercontroller');
const router = express.Router();


router.post('/signup',SignUpuser);
router.post('/login', Loginuser);

module.exports = router;