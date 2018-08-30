const express = require('express');
const router = express.Router();

const user_posts = require('./user_posts');
const {getUser, updateUser, uploadUserImg} = require('../handlers/user');
const {loginRequired, ensureCorrectUser} = require('../middleware/authentication');

router.use('/:user_id/posts', user_posts);

router.get('/:username', getUser);
router.post('/:user_id/upload_image', loginRequired, ensureCorrectUser, uploadUserImg)
router.patch('/:user_id/update', loginRequired, ensureCorrectUser, updateUser);

module.exports = router;