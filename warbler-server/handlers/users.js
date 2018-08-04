const db = require('../models');

exports.getUsers = async function(req, res, next) {
  try {
    let users = await db.User.find();
    users = users.map(user => ({
      _id: user._id,
      name: user.name,
      username: user.username,
      profileImgUrl: user.profileImgUrl
    }));
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

exports.isEmailAvailable = async function(req, res, next) {
  try {
    return res.status(200).json();
  } catch (err) {
    return next(err);
  }
}

exports.isUsernameAvailable = async function(req, res, next) {
  try {
    return res.status(200).json();
  } catch (err) {
    return next(err);
  }
}