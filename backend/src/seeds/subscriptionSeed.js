// seeds/subscriptionSeed.js
const mongoose = require('mongoose');
const Subscription = require('../models/Subscription');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const subscriptions = [
  {
    name: "1 Month Plan",
    totalVisits: 30,
    durationInDays: 60,
    price: 40
  },
  {
    name: "3 Months Plan",
    totalVisits: 90,
    durationInDays: 150,
    price: 80
  },
  {
    name: "6 Months Plan",
    totalVisits: 180,
    durationInDays: 240,
    price: 140
  }
];

const seedDB = async () => {
  await Subscription.deleteMany({});
  await Subscription.insertMany(subscriptions);
};

seedDB().then(() => {
  mongoose.connection.close();
});