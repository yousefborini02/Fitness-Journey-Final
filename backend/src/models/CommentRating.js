const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentRatingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gym: {
    type: Schema.Types.ObjectId,
    ref: 'GymSection',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

const CommentRating = mongoose.model('CommentRating', commentRatingSchema);

module.exports = CommentRating;