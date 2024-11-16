const express = require('express');
const router = express.Router();
const { generateDietPlan } = require('../controllers/dietController');

router.post('/generate', generateDietPlan);

module.exports = router;