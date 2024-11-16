const GymSection = require('../models/GymSection');
const GymAccount = require('../models/GymAccount');
// const User = require('../models/User');

exports.getAllGyms = async (req, res) => {
  try {
    const gyms = await GymSection.find()
      .populate('gymId', 'gymName')
      .select('gymId description images workingHours city isOpen averageRating location')
      .lean();

    console.log("Sample gym location:", gyms[0]?.location); // Check raw location data

    // In your getAllGyms controller:
const formattedGyms = gyms.map(gym => ({
  id: gym._id,
  name: gym.gymId.gymName,
  city: gym.city,
  image: gym.images[0],
  isOpen: gym.isOpen,
  openTime: gym.workingHours[0].openTime,
  closeTime: gym.workingHours[0].closeTime,
  averageRating: gym.averageRating,
  location: {
    type: gym.location?.type || "Point",
    coordinates: [
      parseFloat(gym.location?.coordinates[0] || 0),
      parseFloat(gym.location?.coordinates[1] || 0)
    ]
  }
}));

    console.log("Formatted gym location:", formattedGyms[0]?.location); // Check formatted data
    res.json(formattedGyms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gyms', error: error.message });
  }
};
exports.getGymDetails = async (req, res) => {
    try {
      const gymId = req.params.id;
      const gym = await GymSection.findById(gymId)
        .populate('gymId', 'gymName')
        .lean();
  
      if (!gym) {
        return res.status(404).json({ message: 'Gym not found' });
      }
  
      const formattedGym = {
        id: gym._id,
        name: gym.gymId.gymName,
        description: gym.description,
        images: gym.images,
        workingHours: gym.workingHours,
        city: gym.city,
        isOpen: gym.isOpen,
        phoneNumber: gym.phoneNumber,
        facebookUrl: gym.facebookUrl,
        instagramUrl: gym.instagramUrl,
        location: gym.location
      };
  
      res.json(formattedGym);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching gym details', error: error.message });
    }
  };

  exports.getNearbyGyms = async (req, res) => {
    try {
      const { lat, lng, radius = 5000 } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }
  
      const gyms = await GymSection.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)]
            },
            $maxDistance: parseInt(radius)
          }
        }
      })
      .populate('gymId', 'gymName')
      .lean();
  
      const formattedGyms = gyms.map(gym => ({
        id: gym._id,
        name: gym.gymId.gymName,
        city: gym.city,
        distance: calculateDistance(lat, lng, gym.location.coordinates[1], gym.location.coordinates[0]),
        location: gym.location
      }));
  
      res.json(formattedGyms);
    } catch (error) {
      res.status(500).json({ message: "Error finding nearby gyms", error: error.message });
    }
  };
  
  // Helper function to calculate distance in kilometers
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1); // Distance in km
  }



////////////////////////////////////////////////////////////////////////////////////////////


// const GymSection = require('../models/GymSection');
// const GymAccount = require('../models/GymAccount');

// exports.getAllGyms = async (req, res) => {
//   try {
//     const gyms = await GymSection.find()
//       .populate('gymId', 'gymName')
//       .select('gymId description images workingHours city isOpen averageRating location')
//       .lean();

//     const formattedGyms = gyms.map(gym => ({
//       id: gym._id,
//       name: gym.gymId.gymName,
//       city: gym.city,
//       image: gym.images[0],
//       isOpen: gym.isOpen,
//       openTime: gym.workingHours[0].openTime,
//       closeTime: gym.workingHours[0].closeTime,
//       averageRating: gym.averageRating,
//       location: gym.location
//     }));

//     res.json(formattedGyms);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching gyms', error: error.message });
//   }
// };

// exports.getGymDetails = async (req, res) => {
//   try {
//     const gymId = req.params.id;
//     const gym = await GymSection.findById(gymId)
//       .populate('gymId', 'gymName')
//       .lean();

//     if (!gym) {
//       return res.status(404).json({ message: 'Gym not found' });
//     }

//     const formattedGym = {
//       id: gym._id,
//       name: gym.gymId.gymName,
//       description: gym.description,
//       images: gym.images,
//       workingHours: gym.workingHours,
//       city: gym.city,
//       isOpen: gym.isOpen,
//       phoneNumber: gym.phoneNumber,
//       facebookUrl: gym.facebookUrl,
//       instagramUrl: gym.instagramUrl,
//       location: gym.location
//     };

//     res.json(formattedGym);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching gym details', error: error.message });
//   }
// };

// exports.getNearbyGyms = async (req, res) => {
//   try {
//     const { lat, lng, radius = 5000 } = req.query;

//     const gyms = await GymSection.find({
//       location: {
//         $near: {
//           $geometry: {
//             type: "Point",
//             coordinates: [parseFloat(lng), parseFloat(lat)]
//           },
//           $maxDistance: radius
//         }
//       }
//     }).exec();

//     res.json(gyms);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };