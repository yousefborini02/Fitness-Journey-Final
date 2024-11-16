const express = require('express');
const router = express.Router();
const { sendContactMessage } = require('../controllers/contactController'); // Import controller function
const verifyToken = require('../middleware/verifyToken'); // Import middleware

// POST route to handle contact form submission
router.post('/send', verifyToken, sendContactMessage);

module.exports = router;
