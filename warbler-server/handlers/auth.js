const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signup = async function(req, res, next) {
  try {
    if(req.body.username === 'signin' || req.body.username === 'signup' || req.body.username === 'settings')
      throw new Error("You can't use this username.");
    let user = await db.User.create(req.body);
    let {id, username, name, profileImgUrl, posts, birthday} = user;
    let token = jwt.sign(
      { 
        id, username, name, profileImgUrl, posts, birthday
      }, process.env.SECRET_KEY);
    return res.status(200).json({
      id, username, name, profileImgUrl, posts, birthday, token
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
    let {id, username, name, profileImgUrl, posts, birthday} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch) {
      let token = jwt.sign({
        id, username, name, profileImgUrl, posts, birthday
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        name,
        profileImgUrl,
        posts,
        birthday,
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