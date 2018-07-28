const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next) {
  try {
    if(req.body.username === 'signin' || req.body.username === 'signup')
      throw new Error("You can't use this username.");
    let user = await db.User.create(req.body);
    let {id, username, profileImgUrl, messages} = user;
    let token = jwt.sign(
      { 
        id, username, profileImgUrl, messages
      }, process.env.SECRET_KEY);
    return res.status(200).json({
      id, username, profileImgUrl, messages, token
    });
  } catch (err) {
    if(err.code === 11000) {
      err.message = "Sorry, that username and/or email is already in use"
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

exports.signin = async function(req, res, next) {
  try{
    let user = await db.User.findOne({
      email: req.body.email
    });
    let {id, username, profileImgUrl, messages} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch) {
      let token = jwt.sign({
        id, username, profileImgUrl, messages
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        profileImgUrl,
        messages,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Email or Password'
      })
    }
  } catch (err){
    return next({
      status: 400,
      message: 'Invalid Email or Password'
    });
  }
}