const express = require('express');
const suc = require('../controllers/auth');
// import validator from '../validators/index';
const validator = require('../validators/index')
const router = express.Router(); 


router.post('/sp', validator.handle(),suc.index.bind(suc));

module.exports = router;
