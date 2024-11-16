const express = require('express');
const router = express.Router();
const { registerUser , loginUser , checkAuth , logoutUser } = require('../controllers/authController');

// POST request to register a new user
router.post('/register', registerUser);

// POST request to login a user
router.post('/login', loginUser);

// Check authentication status
router.get('/check-auth', checkAuth);

//Logout functionality
// router.post('/logout', (req, res) => {
//     res.clearCookie('token', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Only in production for HTTPS
//       sameSite: 'Strict'
//     });
//     res.status(200).json({ message: 'Logged out successfully' });
//   });

router.post('/logout', logoutUser);
  

module.exports = router;
