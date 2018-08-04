const express = require('express');
const router = express.Router();

const user = require('./user');
const {getUsers, isEmailAvailable, isUsernameAvailable} = require('../handlers/users');

router.use('/user', user);

router.get('/', getUsers);
router.get('/email_available', isEmailAvailable);
router.get('/username_available', isUsernameAvailable);

module.exports = router;