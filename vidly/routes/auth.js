const jwt= require('jsonwebtoken');
const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//user login fxnality

router.post('/', async (req, res) => {

  const { error } = validateUser(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //2. Check if user already exists:
  let user = await User.findOne({
    email: req.body.email
  })
  if(!user) return res.status(400).send('Invalid email or password');

  const validPassword= await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password');

  //jwt:
  const token =user.generateAuthToken();

    // If we reach here, it means the user exists and the password is valid.
    res.send(token);

  //at this point- 

//   //3. Create a new Object:
//   user = new User(_.pick(req.body, ['name','email', 'password']));

//     //save user to datbase.
//   await user.save();

  // 5. Send response (will hide password in next step)
//   res.send(_.pick(user, ['_id','name','email']));
});

//validate fxn for login validation - email,pass

function validateUser(user) {
const schema = Joi.object( {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

return schema.validate(user);
}



module.exports = router;