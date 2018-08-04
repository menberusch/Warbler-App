const db = require('../models');

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.find(req.params).populate('posts');
    let {username, name, birthday, _id, posts, profileImgUrl} = user[0];
    return res.status(200).json({
      _id, username, name, profileImgUrl, birthday, posts
    });
  } catch (err) {
    return next(err);
  }
}

exports.updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findByIdAndUpdate(req.params.user_id, {$set: req.body}, {new: true});
    let {username, _id, posts, profileImgUrl, name, birthday} = user;
    return res.status(200).json({
      _id, username, name, profileImgUrl, birthday, posts
    });
  } catch (err) {
    return next(err);
  }
}