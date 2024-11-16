const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create-payment-intent', verifyToken, paymentController.createPaymentIntent);
router.post('/confirm-payment', verifyToken, paymentController.confirmPayment);
router.get('/user/subscription', verifyToken, paymentController.checkSubscription);

module.exports = router;