const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {

  //1.valuidate input: with joi:

  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //2. Check if user already exists:
  let user = await User.findOne({
    email: req.body.email
  })
  if(user) return res.status(400).send('User already registered.');

  //3. Create a new Object:
  user = new User(_.pick(req.body, ['name','email', 'password']));
  const salt=await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
    //save user to datbase.
  await user.save();

  // 5. Send response (will hide password in next step)
  res.send(_.pick(user, ['_id','name','email']));
});

module.exports = router;