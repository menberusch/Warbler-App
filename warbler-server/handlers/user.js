const db = require('../models');
const jwt = require('jsonwebtoken');

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
    let {username, id, posts, email, profileImgUrl, name, birthday} = user;
    let token = jwt.sign({
      id, username, email, name, profileImgUrl, posts, birthday
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id, username, email, name, profileImgUrl, birthday, posts, token
    });
  } catch (err) {
    return next(err);
  }
}