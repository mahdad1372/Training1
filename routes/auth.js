const express = require('express');
const { signup } = require('../controllers/auth');
const validator = require('../validators/index');
const router = express.Router(); 


// router.post('/signup', validator.handle() ,signup.userExists);

module.exports = router;
