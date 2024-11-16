const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Controller function to handle user registration
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the account is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'This account is deactivated' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token in cookie
    res.cookie('token', token, {
      httpOnly: false, // The cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'Strict', // Helps prevent CSRF attacks
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: 'Login successful' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check if user is authenticated
const checkAuth = async (req, res) => {
  const token = req.cookies.token; // Get token from cookies

  if (!token) {
    return res.status(401).json({ authenticated: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.id).select('-password');

    if (user.isActive === false) {
      return res.status(403).json({ authenticated: false, message: 'Account is deactivated' });
    }

    return res.status(200).json({ authenticated: true, user });
  } catch (err) {
    return res.status(401).json({ authenticated: false, message: 'Token is not valid' });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only in production for HTTPS
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};



module.exports = { loginUser , registerUser , checkAuth , logoutUser };

