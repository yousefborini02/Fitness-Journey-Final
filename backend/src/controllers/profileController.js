const User = require('../models/User');
const Visit = require('../models/Visit'); // Add this import
const GymSection = require('../models/GymSection'); // Add this import also for better population
// Controller to get user profile data
// profileController.js
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('currentSubscription.subscription');

    // Fetch user's visits with populated gym information
    const visits = await Visit.find({ userId: req.userId })
      .populate({
        path: 'gymSectionId',
        populate: {
          path: 'gymId',
          model: 'GymAccount',
          select: 'gymName'
        }
      })
      .sort({ visitDateTime: -1 }); // Sort by most recent visits first

    const userData = user.toObject();
    userData.visits = visits;

    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update user profile
const updateProfile = async (req, res) => {
  const { name, email, password, contactNumber } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.contactNumber = contactNumber || user.contactNumber;

    if (password) {
      user.password = password; // Assuming password is hashed elsewhere
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };
