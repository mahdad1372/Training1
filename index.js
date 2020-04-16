const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect (process.env.MONGO_LOCAL , {
    useNewUrlParser : true ,
    useCreateIndex : true
}).then(() =>{ console.log(' Data base connected successfully')})

mongoose.connection.on("error", err => {
    console.log(`DB connection error ${err.massage}`);
})

const postroutes = require('./routes/posts');
const authroutes = require('./routes/auth3');
// const validatorOptions = {

// };


// Middle ware

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
// app.use((err, res) => {
//     if (err.name === 'UnauthorizedError') {
//         res.status(500).send(err.message);
//     }
// });


// app.post('/form', [
//     check('name').isLength({ min: 3 }),
//     // check('email').isEmail(),
//     // check('age').isNumeric()
//   ], (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() })
//     }
  
//     const name  = req.body.name
//     const email = req.body.email
//     const age   = req.body.age
//     name.save().then(() => {
//         res.status(200).json('good')
//     }).catch((e) => {
//         res.status(400).json({ error : e.message})
//         console.log(e.message)
//     })
//   })





app.use( '/' , postroutes);
app.use( '/' , authroutes);



const port = process.env.PORT
app.listen( port , () =>{
    console.log(`Node.js api is running on port ${port}`)
});