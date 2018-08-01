const db = require('../models');

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.find(req.params).populate('posts');
    let {username, _id, posts, profileImgUrl} = user[0];
    return res.status(200).json({
      _id, username, profileImgUrl, posts
    });
  } catch (err) {
    return next(err);
  }
}