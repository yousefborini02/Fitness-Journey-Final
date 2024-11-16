// controllers/commentRatingController.js
const CommentRating = require('../models/CommentRating');
const Gym = require('../models/GymSection'); // Assuming you have a Gym model

exports.addCommentRating = async (req, res) => {
  try {
    const { gymId, comment, rating } = req.body;
    const newCommentRating = new CommentRating({
      user: req.userId,
      gym: gymId,
      comment,
      rating
    });
    await newCommentRating.save();

    // Calculate new average rating for the gym
    const allRatings = await CommentRating.find({ gym: gymId });
    const totalRating = allRatings.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = totalRating / allRatings.length;

    // Update gym's average rating
    await Gym.findByIdAndUpdate(gymId, { averageRating: averageRating.toFixed(1) });

    res.status(201).json(newCommentRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCommentRatingsForGym = async (req, res) => {
  try {
    const gymId = req.params.gymId;
    const commentRatings = await CommentRating.find({ gym: gymId })
      .populate('user', 'name profileImage')
      .sort('-createdAt');
    
    const gym = await Gym.findById(gymId);
    
    res.json({
      commentRatings,
      averageRating: gym.averageRating || 0,
      totalComments: commentRatings.length
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};