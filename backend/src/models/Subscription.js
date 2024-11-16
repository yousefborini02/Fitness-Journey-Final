const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Subscription Schema
const subscriptionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  totalVisits: {
    type: Number,
    required: true
  },
  durationInDays: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Create the Subscription model
const Subscription = mongoose.model('Subscription', subscriptionSchema, 'Subscriptions');

module.exports =  Subscription ;