const jwt = require('jsonwebtoken');
require('dotenv').config();

const expressJwt = require('express-jwt');
const Post = require('../models/post');
const User = require('../models/user');

const {validationResult} = require('express-validator/check');
exports.getPosts = (req , res) =>{
    // res.json({
    //     posts:[
    //       {"First name" : "Mahdad"},
    //       {"Last name " : "naderinia"}
    //     ]
    // })
    const posts = User.find()
    .then(posts => {
        res.status(200).json({ Data : posts});
    })
    .catch((err) => { console.log(err)});
}

exports.getPosts2 = (req , res) =>{
  // res.json({
  //     posts:[
  //       {"First name" : "Mahdad"},
  //       {"Last name " : "naderinia"}
  //     ]
  // })
  const posts = Post.find()
  .then(posts => {
      res.status(200).json({ Data : posts});
  })
  .catch((err) => {res.json({ err :'Sorry'})});
}


exports.createPost =  (req, res) => {
    // const errors = validationResult(req);
 
    //     if(!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    //     }
    const post = new Post (req.body);
    if ( req.body.body === "saman" || req.body.title === "shiva" ){
        res.status(403).json("sorry")
    }else
    {
        if(req.body.title.length  < 3 ){
            res.status(403).json("More charechter please")
        }else{
            post.save().then(() => {
                res.status(200).json('good')
                
            })}
        }
}



exports.createPost2 = async (req, res) => {
    const post = new Post (req.body);
    const errors = validationResult(req);
    // const userExists = await Post.findOne({ email : req.body.email})
    // if (userExists){
    //   return res.status(403).json({
    //     error : 'Email is token'
    //   })
    // }  
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array()[0].msg);
    } else {
      await post.save().then(() => {
        res.status(200).json('Data successfully send')
        
    })
    }
  }




  exports.Singup = async (req, res) => {
    const post = new User (req.body);
    const errors = validationResult(req);
    const userExists = await User.findOne({ email : req.body.email})
    if (userExists){
      return res.status(403).json({
        error : 'Email is token'
      })
    }  
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array()[0].msg);
    } else {
      await post.save().then(() => {
        res.status(200).json('Data successfully send')
        
    })
    }
  }


  exports.Signin = (req , res) => {

    //Find the user base on email
    const {email , password} = req.body
    User.findOne({email} , (err,user) => {
      if (err || !user){
        return res.status(401).json({
          error : 'User with the email does not exists. Please sign in again'
        });
      }

      if (!user.authenticate(password)){
        return res.status(401).json({
          error : 'Email and password does not match'
        });
      }

      const token = jwt.sign({_id : user.id } , process.env.JWT_SECRET)
      // const token =jwt.sign({data: 'foobar'}, process.env.JWT_SECRET,
      // { expiresIn: 60 * 60 });
      res.cookie("t", token , { expire: new Date() +9999})

      const {_id , name , email} = user;
      return res.json({ token , user : { _id , name , email}})
    });

  };


  exports.Signout = (req , res) => {
    res.clearCookie("t");
    return res.json({ message : "Sign out successfully"})
  }

  exports.requiredSignin = expressJwt({
    secret : process.env.JWT_SECRET
  })