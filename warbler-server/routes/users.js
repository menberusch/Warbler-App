const express = require('express');
const router = express.Router();
const users_posts = require('./users_posts');

const {getUser} = require('../handlers/users');

router.use('/:user_id/posts', users_posts);
router.get('/:username', getUser);

module.exports = router;