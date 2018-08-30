const db = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.find(req.params).populate('posts');
    if(user.length) {
      const {username, name, birthday, _id, posts, profileImgUrl} = user[0];
      return res.status(200).json({
        _id, username, name, profileImgUrl, birthday, posts
      });
    } else {
      console.log(req.params);
      return res.status(200).json({
        errorMsg: `Can't find page of ${req.params.username}...`
      });
    }
  } catch (err) {
    return next(err);
  }
}

exports.updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, {new: true});
    let {username, id, posts, email, name, birthday} = user;
    let token = jwt.sign({
      id, username, email, name, posts, birthday
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id, username, email, name, birthday, posts, token
    });
  } catch (err) {
    return next(err);
  }
}

exports.updateUserImg = async function(req, res, next) {
  try {
    console.log(req.body);
    let imgFileString = req.body.imgFile;
    imgFileString = imgFileString.replace(/data:image\/(png|jpeg);base64,/, "");
    let imgFileName = req.body.username + new Date().getTime() + '.png';
    fs.writeFileSync(`profile_images/${imgFileName}`, imgFileString, {
      'encoding': 'base64'
    });
    return res.status(200);
  } catch(err) {
    return next(err);
  }
}