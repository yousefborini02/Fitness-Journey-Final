const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const User = require('../models/User');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.currentSubscription && user.currentSubscription.subscription) {
      return res.status(400).json({ message: 'You already have an active subscription' });
    }

    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: subscription.price * 100,
      currency: 'usd',
      metadata: { userId: userId, subscriptionId: subscriptionId }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const userId = req.userId;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'succeeded') {
      const subscriptionId = paymentIntent.metadata.subscriptionId;
      const subscription = await Subscription.findById(subscriptionId);

      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      const user = await User.findById(userId);
      if (user.currentSubscription && user.currentSubscription.subscription) {
        return res.status(400).json({ message: 'You already have an active subscription' });
      }

      const now = new Date();
      const expiresAt = new Date(now.getTime() + subscription.durationInDays * 24 * 60 * 60 * 1000);

      await User.findByIdAndUpdate(userId, {
        currentSubscription: {
          subscription: subscriptionId,
          remainingVisits: subscription.totalVisits,
          createdAt: now,
          expiresAt: expiresAt
        }
      });

      res.json({ message: 'Payment confirmed and subscription updated' });
    } else {
      res.status(400).json({ message: 'Payment not succeeded' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkSubscription = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const hasSubscription = user.currentSubscription && user.currentSubscription.subscription;
      res.json({ hasSubscription });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


