const express = require('express');
const router = express.Router();

const user_posts = require('./user_posts');
const {getUser, updateUser} = require('../handlers/user');
const {loginRequired, ensureCorrectUser} = require('../middleware/authentication');

router.use('/:user_id/posts', user_posts);
router.get('/:username', getUser);
router.patch('/:user_id/update', loginRequired, ensureCorrectUser, updateUser);

module.exports = router;