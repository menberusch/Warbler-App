const express = require('express');
const router = express.Router();

const {getUser} = require('../handlers/users');

router.route('/:username').get(getUser);

module.exports = router;