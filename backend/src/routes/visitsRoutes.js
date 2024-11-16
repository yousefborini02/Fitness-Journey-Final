const express = require('express');
const router = express.Router();
const visitsController = require('../controllers/visitsController');
const verifyToken = require('../middleware/verifyToken');

router.post('/record/:gymId', verifyToken, visitsController.recordVisit);

module.exports = router;