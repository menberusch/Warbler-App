const db = require('../models');

exports.getUser = async function(req, res, next) {
  try {
    console.log(req.params);
    let user = await db.User.find(req.params);
    let {username, _id, messages, profileImgUrl} = user[0];
    return res.status(200).json({
      _id, username, profileImgUrl, messages
    });
  } catch (err) {
    return next(err);
  }
}