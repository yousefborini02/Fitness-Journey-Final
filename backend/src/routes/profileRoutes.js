const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.get('/', verifyToken, getProfile);
router.put('/', verifyToken, updateProfile);

module.exports = router;
