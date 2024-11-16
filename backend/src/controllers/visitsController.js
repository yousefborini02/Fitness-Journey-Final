// const User = require('../models/User');
// const GymSection = require('../models/GymSection');

// exports.recordVisit = async (req, res) => {
//   try {
//     const { gymId } = req.params;
//     const userId = req.userId;

//     const user = await User.findById(userId);
    
//     if (!user.currentSubscription || user.currentSubscription.remainingVisits <= 0) {
//       return res.status(400).json({ message: 'No active subscription or no remaining visits' });
//     }

//     const gym = await GymSection.findById(gymId);
//     if (!gym) {
//       return res.status(404).json({ message: 'Gym not found' });
//     }

//     // Decrement remaining visits
//     user.currentSubscription.remainingVisits -= 1;
    
//     if (user.currentSubscription.remainingVisits === 0){
//         user.currentSubscription = null;
//     }
//     await user.save();

//     res.status(200).json({ message: 'Visit recorded successfully', remainingVisits: user.currentSubscription.remainingVisits });
//   } catch (error) {
//     console.error('Error recording visit:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };



const User = require('../models/User');
const GymSection = require('../models/GymSection');
const Visit = require('../models/Visit'); // Add the new Visit model

exports.recordVisit = async (req, res) => {
  try {
    const { gymId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    
    if (!user.currentSubscription || user.currentSubscription.remainingVisits <= 0) {
      return res.status(400).json({ message: 'No active subscription or no remaining visits' });
    }

    const gym = await GymSection.findById(gymId);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }

    // Create new visit record
    const newVisit = new Visit({
      userId: userId,
      gymSectionId: gymId,
      visitDateTime: new Date()
    });
    await newVisit.save();

    // Decrement remaining visits
    user.currentSubscription.remainingVisits -= 1;
    
    if (user.currentSubscription.remainingVisits === 0) {
        user.currentSubscription = null;
    }
    await user.save();

    res.status(200).json({ 
      message: 'Visit recorded successfully', 
      remainingVisits: user.currentSubscription?.remainingVisits || 0,
      visitId: newVisit._id 
    });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};