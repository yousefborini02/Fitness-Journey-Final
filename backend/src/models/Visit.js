const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gymSectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GymSection',
    required: true
  },
  visitDateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visit', visitSchema);