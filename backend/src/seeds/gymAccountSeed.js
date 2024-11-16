const mongoose = require('mongoose');
const GymAccount = require('../models/GymAccount'); // Adjust the path if needed
const dotenv = require('dotenv');
dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Seed data for gym accounts
const gymAccounts = [
  {
    gymName: 'Iron Gym',
    email: 'contact@irongym.com',
    password: 'strongpassword1', // The password will be hashed in the model
    isApproved: true,
    commercialRegister: '/path/to/iron-gym-register.pdf',
  },
  {
    gymName: 'Fit Life Gym',
    email: 'info@fitlifegym.com',
    password: 'strongpassword2',
    isApproved: false, // Not yet approved
    commercialRegister: '/path/to/fitlife-register.pdf',
  },
  {
    gymName: 'Powerhouse Gym',
    email: 'admin@powerhousegym.com',
    password: 'strongpassword3',
    isApproved: true,
    commercialRegister: '/path/to/powerhouse-register.pdf',
  },
  {
    gymName: 'Peak Fitness',
    email: 'peak@peakfitness.com',
    password: 'strongpassword4',
    isApproved: false,
    commercialRegister: '/path/to/peakfitness-register.pdf',
  },
];

// Function to insert the seed data into the database
const seedGymAccounts = async () => {
  try {
    // Clear any existing data
    await GymAccount.deleteMany({});
    
    // Insert new data
    await GymAccount.insertMany(gymAccounts);
    console.log('Seed data successfully inserted');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Run the seed function
seedGymAccounts();
