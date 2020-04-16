const express = require('express');
const Post = require('../models/post');
const postcontrollers = require('../controllers/post');
const {check, validationResult} = require('express-validator/check');
const router = express.Router(); 


router.post('/new12', [
    check('title').not().isEmpty().withMessage('Name must have more than 5 characters'),
    // check('classYear', 'Class Year should be a number').not().isEmpty(),
    // check('weekday', 'Choose a weekday').optional(),
    check('body').isLength({min: 5})
    .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد')
    // check('password', 'Your password must be at least 5 characters').not().isEmpty(),
  ],
  // function (req, res) {
  //   const post = new Post (req.body);
  //   const errors = validationResult(req);
  //   console.log(req.body);

  //   if (!errors.isEmpty()) {
  //     return res.status(422).jsonp(errors.array()[0].msg);
  //   } else {
  //     post.save().then(() => {
  //       res.status(200).json('Data successfully send')
        
  //   })
  //   }
  // }
  postcontrollers.createPost2
  );

module.exports = router;
