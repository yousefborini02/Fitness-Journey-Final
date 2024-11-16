const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');


router.get('/all', gymController.getAllGyms);
router.get('/:id', gymController.getGymDetails);
router.get('/nearby', gymController.getNearbyGyms);

module.exports = router;