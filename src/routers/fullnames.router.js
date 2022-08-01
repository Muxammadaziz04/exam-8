const express = require('express');
const { getFullnames } = require('../controllers/fullname.controller');

const router = express.Router();

router.get('/fullname', getFullnames)

module.exports = router