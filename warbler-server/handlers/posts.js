const db = require('../models');

exports.createPost = async function(req, res, next) {
  try {
    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();
    let foundPost = await db.Post.findById(post.id).populate('user', {
      username: true,
      profileImgUrl: true,
    });
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};
exports.getPost = async function(req, res, next) {
  try {
    let post = await db.Post.find(req.params.post_id);
    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};
exports.deletePost = async function(req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    foundPost.remove();
    return res.status(200).json(foundPost);
  } catch (err) {
    return next(err);
  }
};