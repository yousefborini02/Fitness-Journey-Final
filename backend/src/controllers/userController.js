const User = require('../models/User'); // Assuming the User model is in this path

// Controller to get the current user subscription
const getCurrentSubscription = async (req, res) => {
  try {
    // Get the user's ID from req.user (assumed to be set by authentication middleware)
    const userId = req.userId;
    
    // Find the user by ID and populate the subscription reference if necessary
    const user = await User.findById(userId).populate('currentSubscription.subscription');

    if (!user || !user.currentSubscription.subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Send back the current subscription details
    res.status(200).json({
      subscription: user.currentSubscription.subscription,
      remainingVisits: user.currentSubscription.remainingVisits,
      createdAt: user.currentSubscription.createdAt,
      expiresAt: user.currentSubscription.expiresAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCurrentSubscription };
