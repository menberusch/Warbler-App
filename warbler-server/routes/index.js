const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const postsRoutes = require('./posts');
const usersRoutes = require('./users');

router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);

module.exports = router;