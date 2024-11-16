const express = require('express');
const router = express.Router();
const { getCurrentSubscription } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// Route to get the current subscription for the logged-in user
router.get('/current-subscription', verifyToken, getCurrentSubscription);

module.exports = router;
