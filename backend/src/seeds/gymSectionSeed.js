const mongoose = require('mongoose');
const dotenv = require('dotenv');
const GymSection = require('../models/GymSection'); // Adjust the path to the GymSection model
const GymAccount = require('../models/GymAccount'); // Adjust the path to the GymAccount model

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Seed data for gym sections (fetching gymId from existing GymAccount documents)
const seedGymSections = async () => {
  try {
    // Fetch some existing GymAccount IDs
    const gyms = await GymAccount.find().limit(4); // Fetching a few gyms to reference

    if (gyms.length === 0) {
      console.log('No gyms found. Please seed gym accounts first.');
      return;
    }

    // Sample gym sections data
    const gymSections = [
      {
        gymId: gyms[0]._id, // Reference to a GymAccount
        description: 'The best gym in Amman with modern equipment.',
        images: [
          '/path/to/image1.jpg',
          '/path/to/image2.jpg'
        ],
        workingHours: [
          { day: 'Sunday', openTime: '10:00 AM', closeTime: '10:00 PM' },
          { day: 'Monday', openTime: '10:00 AM', closeTime: '10:00 PM' },
          { day: 'Tuesday', openTime: '10:00 AM', closeTime: '10:00 PM' },
          { day: 'Wednesday', openTime: '10:00 AM', closeTime: '10:00 PM' },
          { day: 'Thursday', openTime: '10:00 AM', closeTime: '10:00 PM' },
          { day: 'Friday', openTime: '12:00 PM', closeTime: '8:00 PM' },
          { day: 'Saturday', openTime: '12:00 PM', closeTime: '8:00 PM' },
        ],
        facebookUrl: 'https://facebook.com/irongym',
        instagramUrl: 'https://instagram.com/irongym',
        phoneNumber: '+962123456789',
        city: 'Amman',
        location: {
          type: 'Point',
          coordinates: [35.9239625, 31.9515694] // Example coordinates for Amman
        },
        isOpen: false
      },
      {
        gymId: gyms[1]._id, // Reference to another GymAccount
        description: 'A gym focused on fitness and wellness in Zarqa.',
        images: [
          '/path/to/zarqa_gym_image1.jpg',
          '/path/to/zarqa_gym_image2.jpg'
        ],
        workingHours: [
          { day: 'Sunday', openTime: '8:00 AM', closeTime: '8:00 PM' },
          { day: 'Monday', openTime: '8:00 AM', closeTime: '8:00 PM' },
          { day: 'Tuesday', openTime: '8:00 AM', closeTime: '8:00 PM' },
          { day: 'Wednesday', openTime: '8:00 AM', closeTime: '8:00 PM' },
          { day: 'Thursday', openTime: '8:00 AM', closeTime: '8:00 PM' },
          { day: 'Friday', openTime: '10:00 AM', closeTime: '6:00 PM' },
          { day: 'Saturday', openTime: '10:00 AM', closeTime: '6:00 PM' },
        ],
        facebookUrl: 'https://facebook.com/fitlifegym',
        instagramUrl: 'https://instagram.com/fitlifegym',
        phoneNumber: '+962987654321',
        city: 'Zarqa',
        location: {
          type: 'Point',
          coordinates: [36.056252, 32.073791] // Example coordinates for Zarqa
        },
        isOpen: true 
      },
      // Add more sections if needed
    ];

    // Clear any existing data
    await GymSection.deleteMany({});
    
    // Insert new data
    await GymSection.insertMany(gymSections);
    console.log('Gym Sections seed data successfully inserted');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Run the seed function
seedGymSections();
