const express = require('express');
const router = express.Router({mergeParams: true});

const {createPost, getPost, deletePost} = require('../handlers/posts'); 

router.route('/').post(createPost);

router.route('/:post_id').get(getPost).delete(deletePost);

module.exports = router;