const express = require('express');
const postcontrollers = require('../controllers/post');
const {Signin} =require('../controllers/post');
const {requiredSignin} =require('../controllers/post');
const {check, validationResult} = require('express-validator/check');
// const validator = require('../validators/validator2');
const router = express.Router();




router.get('/'  , requiredSignin ,postcontrollers.getPosts2);
router.post('/signup' , 
[check('name').isLength({min: 5}).withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد'),

check('email').isEmail().withMessage('you have to put email address'),

check('password').not().isEmpty().withMessage('passwor is empthy')] , postcontrollers.Singup);


router.post('/signin' ,Signin);
router.get('/signout' ,postcontrollers.Signout);




// router.post('/new1', [
//     check('titie').not().isEmpty().withMessage('Name must have more than 5 characters'),
//     // check('classYear', 'Class Year should be a number').not().isEmpty(),
//     // check('weekday', 'Choose a weekday').optional(),
//     // check('email', 'Your email is not valid').not().isEmpty(),
//     // check('password', 'Your password must be at least 5 characters').not().isEmpty(),
//   ],
//   function (req, res) {
//     const errors = validationResult(req);
//     console.log(req.body);

//     if (!errors.isEmpty()) {
//       return res.status(422).jsonp(errors.array());
//     } else {
//       res.send({});
//     }
//   });



module.exports = router;
