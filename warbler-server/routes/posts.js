const express = require('express');
const router = express.Router();

const {getPosts} = require('../handlers/posts');
const {loginRequired} = require('../middleware/authentication');

router.get('/', loginRequired, getPosts);

module.exports = router;