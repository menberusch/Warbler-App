require('dotenv').load();
const jwt = require('jsonwebtoken');

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => (
      decoded ? next() : next({ 
        status: 401, 
        message: 'Please log in first'
      })
    ))
  } catch(err) {
    return next({ status: 401, message: 'Please log in first'});
  }
}

exports.ensureCorrectUser = function(req, res, next) {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=> {
      console.log(decoded);
      return decoded && decoded.id === req.params.user_id ? next()
      : next({
          status: 401,
          message: 'Unauthorized'
        })
    })
  } catch (err) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
}