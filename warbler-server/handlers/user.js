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
    let {username, id, posts, email, name, profileImgUrl, birthday} = user;
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

exports.uploadUserImg = async function(req, res, next) {
  try {
    const {prevImage, image, imageName} = req.body;
    
    if(prevImage) {
      fs.unlinkSync('public/' + prevImage);
    }
    
    if(image) {
      let imageCopy = image;
      imageCopy = imageCopy.replace(/data:image\/(png|jpeg|jpg);base64,/, "");
      
      
      fs.writeFileSync(`public/profile_images/${imageName}`, imageCopy, {
        'encoding': 'base64'
      });

      return res.status(200).json({imagePath: `/profile_images/${imageName}`});
    }

    return res.status(200).json({imagePath: ''});

  } catch(err) {
    return next(err);
  }
}