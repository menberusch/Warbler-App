const db = require('../models');

exports.getPosts = async function(req, res, next) {
  try {
    let posts = await db.Post.find()
    .sort({ createdAt: 'desc'})
    .populate('user', {
      username: true,
      profileImgUrl: true
    });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(err);
  }
};