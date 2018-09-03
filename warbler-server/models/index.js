const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/warbler', {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require('./user');
module.exports.Post = require('./post');