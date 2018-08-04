const express = require('express');
const router = express.Router({mergeParams: true});

const {createPost, deletePost} = require('../handlers/user_posts');
const {loginRequired, ensureCorrectUser} = require('../middleware/authentication');

router.use(loginRequired, ensureCorrectUser);

router.post('/', createPost);
router.delete('/:post_id', deletePost);

module.exports = router;