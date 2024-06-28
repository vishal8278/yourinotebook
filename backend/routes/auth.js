const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SCREATE = 'vishaljwt#screate&';
var fetchuser = require('../middleware/fetchuser');

// ROUTE 1: create a user using : POST "/api/auth/createuser" . Doesn't required Auth
router.post('/createuser',[
    body('email','enter a valid email ').isEmail(),
    body('password','enter a valid password atleast 5 lenght').isLength({ min: 5 }),
    body('name','enter a valid name atleast 3 length').isLength({ min: 3 })
],async (req,res)=>{ 
  let success = false;
  // if their are no error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
    let user = await User.findOne({success, email:req.body.email})
    if(user){
      return res.status(400).json({error:"sorry this email is already exist"});
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
      const data ={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SCREATE);
      success =true;
    res.json({success,authtoken});
  } catch (error) {
      console.error(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
  }
})

// ROUTE 2 : login a user using : POST "/api/auth/login" . Doesn't required Auth
router.post('/login',[
  body('email','enter a valid email ').isEmail(),
  body('password','password can not be blank').exists(),
],async (req,res)=>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password} = req.body;
  try {
    let user = await  User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error:"sorry user user or password are incorrect"});

    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success,error:"sorry user user or password are incorrect"});
    }
    const data ={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data,JWT_SCREATE);
    success = true;
  res.json({success, authtoken});
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
})

// ROUTE 3: Get login user details POST "/api/auth/getuser" .login  required Auth
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
}
})


module.exports = router