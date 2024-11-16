const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.get('/subscriptions/:id', subscriptionController.getSubscriptionById);

module.exports = router;