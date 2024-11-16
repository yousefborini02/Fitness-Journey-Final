// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Button from "../layouts/Button";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const GymCard = ({ gym }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3, delay: 0.1 }}
//     className="bg-[#222] rounded-lg overflow-hidden shadow-lg p-4"
//   >
//     <img src={gym.image} alt={gym.name} className="h-40 w-full object-cover mb-4 rounded-t-lg" />
//     <div className="flex items-center space-x-2 mb-4">
//       <span className="bg-[#3CB347] text-white text-sm px-1.5 py-0.5 rounded animate-pulse">{gym.averageRating}</span>
//       <h3 className="text-xl mb-2 text-white mt-2">{gym.name}</h3>
//     </div>
//     <p className="text-gray-300 mb-4">{gym.city}</p>
//     <div className="flex justify-between">
//       <p className="w-20 text-center text-[#3CB347] border-2 border-[#3CB347] rounded-full p-2">
//         {gym.isOpen ? "Open" : "Closed"}
//       </p>
//       <p className="text-gray-300">
//         {gym.isOpen ? `Closes at ${gym.closeTime}` : `Opens at ${gym.openTime}`}
//       </p>
//     </div>
//     <div className="flex justify-center mt-5">
//       <Link to={`/gymdetails/${gym.id}`}>  
//         <Button title="View Details" />
//       </Link>
//     </div>
//   </motion.div>
// );

// const GymCatalog = () => {
//   const [gyms, setGyms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const gymsPerPage = 6;

//   useEffect(() => {
//     const fetchGyms = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/gyms/all');
//         setGyms(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch gyms');
//         setLoading(false);
//       }
//     };

//     fetchGyms();
//   }, []);

//   const indexOfLastGym = currentPage * gymsPerPage;
//   const indexOfFirstGym = indexOfLastGym - gymsPerPage;
//   const currentGyms = gyms.slice(indexOfFirstGym, indexOfLastGym);

//   const totalPages = Math.ceil(gyms.length / gymsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const rowVariants = {
//     hidden: (direction) => ({
//       opacity: 0,
//       x: direction === "left" ? -100 : 100,
//     }),
//     visible: {
//       opacity: 1,
//       x: 0,
//     },
//   };

//   const rows = currentGyms.reduce((acc, gym, index) => {
//     const rowIndex = Math.floor(index / 3);
//     if (!acc[rowIndex]) acc[rowIndex] = [];
//     acc[rowIndex].push(gym);
//     return acc;
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-24">
//         <div className="flex flex-col md:flex-row justify-start gap-5 mb-8">
//           <input
//             type="text"
//             placeholder="Search gyms..."
//             className="w-full bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] md:w-1/2 lg:w-1/3 px-4 py-2 border border-[#444] rounded-lg"
//           />
//           <select className="w-full focus:outline-none bg-[#222] focus:ring-2 focus:ring-[#3CB347] md:w-1/4 lg:w-1/6 px-4 py-2 border border-[#444] rounded-lg text-white">
//             <option>Choose City</option>
//             <option>Amman</option>
//             <option>Zarqa</option>
//           </select>
//           <select className="w-full focus:outline-none bg-[#222] focus:ring-2 focus:ring-[#3CB347] md:w-1/4 lg:w-1/6 px-4 py-2 border border-[#444] rounded-lg text-white">
//             <option>Choose Activity</option>
//             <option>Option 2</option>
//             <option>Option 3</option>
//           </select>
//         </div>

//         {rows.length > 0 && (
//           <div className="space-y-8">
//             {rows.map((row, rowIndex) => (
//               <motion.div
//                 key={rowIndex}
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={rowIndex % 2 === 0 ? "left" : "right"}
//                 transition={{ duration: 1, delay: rowIndex * 0.2 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {row.map((gym, index) => (
//                   <GymCard key={gym.id} gym={gym} />
//                 ))}
//               </motion.div>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-center items-center mt-10">
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <span className="mx-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default GymCatalog;

///////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect , useCallback } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Button from "../layouts/Button";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";

// const MapModal = ({ isOpen, onClose, gyms, userLocation }) => {
//   if (!isOpen) return null;

//   const mapStyles = {
//     height: "70vh",
//     width: "100%",
//   };

//   const center = userLocation ? {
//     lat: userLocation.lat,
//     lng: userLocation.lng
//   } : {
//     lat: 31.9539,
//     lng: 35.9106
//   };

//   // Calculate distance between two points in kilometers
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth's radius in km
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return (R * c).toFixed(1); // Distance in km
//   };

//   // Open in Google Maps
//   const openInGoogleMaps = (gymLat, gymLng) => {
//     const url = userLocation 
//       ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${gymLat},${gymLng}`
//       : `https://www.google.com/maps/search/?api=1&query=${gymLat},${gymLng}`;
//     window.open(url, '_blank');
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-[#222] rounded-lg p-6 w-full max-w-4xl">
//         <div className="flex justify-between mb-4">
//           <h2 className="text-xl text-white">Nearby Gyms</h2>
//           <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
//         </div>
//         <LoadScript 
//           googleMapsApiKey="AIzaSyDM6_CMJoXRbu_cztvxTBqwrf16rI0lc5Y"
//           libraries={["marker"]}
//         >
//           <GoogleMap
//             mapContainerStyle={mapStyles}
//             zoom={11}
//             center={center}
//             options={{
//               styles: [], // Empty array for default white style
//               zoomControl: true,
//               mapTypeControl: true,
//               streetViewControl: true,
//               fullscreenControl: true,
//             }}
//             onLoad={(map) => {
//               // User marker
//               if (userLocation) {
//                 new google.maps.Marker({
//                   position: { lat: userLocation.lat, lng: userLocation.lng },
//                   map,
//                   title: "Your Location",
//                   icon: {
//                     url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
//                   }
//                 });
//               }

//               // Gym markers with info windows
//               gyms.forEach(gym => {
//                 if (gym.location?.coordinates) {
//                   const gymPosition = {
//                     lat: parseFloat(gym.location.coordinates[1]),
//                     lng: parseFloat(gym.location.coordinates[0])
//                   };

//                   const distance = userLocation ? 
//                     calculateDistance(
//                       userLocation.lat, 
//                       userLocation.lng, 
//                       gymPosition.lat, 
//                       gymPosition.lng
//                     ) : null;

//                   const marker = new google.maps.Marker({
//                     position: gymPosition,
//                     map,
//                     title: gym.name,
//                     icon: {
//                       url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
//                     }
//                   });

//                   const infoWindow = new google.maps.InfoWindow({
//                     content: `
//                       <div style="color: black;">
//                         <h3 style="font-weight: bold; margin-bottom: 5px;">${gym.name}</h3>
//                         <p style="margin-bottom: 5px;">${gym.city}</p>
//                         ${distance ? `<p style="margin-bottom: 5px;">Distance: ${distance} km</p>` : ''}
//                         <button 
//                           onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat},${userLocation?.lng}&destination=${gymPosition.lat},${gymPosition.lng}', '_blank')"
//                           style="background-color: #3CB347; color: white; padding: 5px 10px; border: none; border-radius: 5px; margin-top: 5px; cursor: pointer;"
//                         >
//                           Get Directions
//                         </button>
//                       </div>
//                     `
//                   });

//                   marker.addListener("click", () => {
//                     infoWindow.open(map, marker);
//                   });
//                 }
//               });

//               // Add distance legend if user location is available
//               if (userLocation) {
//                 const legend = document.createElement('div');
//                 legend.style.backgroundColor = 'white';
//                 legend.style.border = '1px solid #ccc';
//                 legend.style.borderRadius = '5px';
//                 legend.style.padding = '10px';
//                 legend.style.margin = '10px';
//                 legend.style.fontSize = '12px';

//                 legend.innerHTML = `
//                   <div style="color: black;">
//                     <p>🔵 Your Location</p>
//                     <p>🔴 Gym Location</p>
//                     <p>Click markers for details and directions</p>
//                   </div>
//                 `;

//                 map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
//               }
//             }}
//           />
//         </LoadScript>

//         {/* List of gyms with distances */}
//         <div className="mt-4 max-h-40 overflow-y-auto">
//           {gyms.map(gym => {
//             if (!gym.location?.coordinates) return null;
            
//             const distance = userLocation ? 
//               calculateDistance(
//                 userLocation.lat,
//                 userLocation.lng,
//                 parseFloat(gym.location.coordinates[1]),
//                 parseFloat(gym.location.coordinates[0])
//               ) : null;

//             return (
//               <div 
//                 key={gym.id} 
//                 className="flex justify-between items-center p-2 border-b border-gray-700 text-white"
//                 onClick={() => openInGoogleMaps(
//                   parseFloat(gym.location.coordinates[1]),
//                   parseFloat(gym.location.coordinates[0])
//                 )}
//               >
//                 <div>
//                   <p className="font-semibold">{gym.name}</p>
//                   <p className="text-sm text-gray-400">{gym.city}</p>
//                 </div>
//                 {distance && (
//                   <p className="text-sm bg-[#3CB347] px-2 py-1 rounded">
//                     {distance} km
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
// const GymCard = ({ gym }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     initial={{ opacity: 0, y: 50 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.3, delay: 0.1 }}
//     className="bg-[#222] rounded-lg overflow-hidden shadow-lg p-4"
//   >
//     <img src={gym.image} alt={gym.name} className="h-40 w-full object-cover mb-4 rounded-t-lg" />
//     <div className="flex items-center space-x-2 mb-4">
//       <span className="bg-[#3CB347] text-white text-sm px-1.5 py-0.5 rounded animate-pulse">{gym.averageRating}</span>
//       <h3 className="text-xl mb-2 text-white mt-2">{gym.name}</h3>
//     </div>
//     <p className="text-gray-300 mb-4">{gym.city}</p>
//     <div className="flex justify-between">
//       <p className="w-20 text-center text-[#3CB347] border-2 border-[#3CB347] rounded-full p-2">
//         {gym.isOpen ? "Open" : "Closed"}
//       </p>
//       <p className="text-gray-300">
//         {gym.isOpen ? `Closes at ${gym.closeTime}` : `Opens at ${gym.openTime}`}
//       </p>
//     </div>
//     <div className="flex justify-center mt-5">
//       <Link to={`/gymdetails/${gym.id}`}>  
//         <Button title="View Details" />
//       </Link>
//     </div>
//   </motion.div>
// );

// const GymCatalog = () => {
//   const [gyms, setGyms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const gymsPerPage = 6;

//   // In GymCatalog component, update the useEffect:
// useEffect(() => {
//   const fetchGyms = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/gyms/all');
//       const formattedGyms = response.data.map(gym => ({
//         ...gym,
//         location: {
//           ...gym.location,
//           coordinates: gym.location.coordinates.map(coord => parseFloat(coord))
//         }
//       }));
//       setGyms(formattedGyms);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching gyms:", err);
//       setError('Failed to fetch gyms');
//       setLoading(false);
//     }
//   };

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userPos = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude
//         };
//         setUserLocation(userPos);
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         setUserLocation({
//           lat: 31.9539,
//           lng: 35.9106
//         });
//       }
//     );
//   }

//   fetchGyms();
// }, []);


//   const indexOfLastGym = currentPage * gymsPerPage;
//   const indexOfFirstGym = indexOfLastGym - gymsPerPage;
//   const currentGyms = gyms.slice(indexOfFirstGym, indexOfLastGym);

//   const totalPages = Math.ceil(gyms.length / gymsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const rowVariants = {
//     hidden: (direction) => ({
//       opacity: 0,
//       x: direction === "left" ? -100 : 100,
//     }),
//     visible: {
//       opacity: 1,
//       x: 0,
//     },
//   };

//   const rows = currentGyms.reduce((acc, gym, index) => {
//     const rowIndex = Math.floor(index / 3);
//     if (!acc[rowIndex]) acc[rowIndex] = [];
//     acc[rowIndex].push(gym);
//     return acc;
//   }, []);

//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-24">
//         <div className="flex flex-col md:flex-row justify-start gap-5 mb-8">
//           <input
//             type="text"
//             placeholder="Search gyms..."
//             className="w-full bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] md:w-1/2 lg:w-1/3 px-4 py-2 border border-[#444] rounded-lg"
//           />
//           <select className="w-full focus:outline-none bg-[#222] focus:ring-2 focus:ring-[#3CB347] md:w-1/4 lg:w-1/6 px-4 py-2 border border-[#444] rounded-lg text-white">
//             <option>Choose City</option>
//             <option>Amman</option>
//             <option>Zarqa</option>
//           </select>
          
//           <button
//             onClick={() => setShowMap(true)}
//             className="px-4 py-2 bg-[#3CB347] text-white rounded-lg hover:bg-[#2ea23a] transition-colors"
//           >
//             View on Map
//           </button>
//         </div>

//         {rows.length > 0 && (
//           <div className="space-y-8">
//             {rows.map((row, rowIndex) => (
//               <motion.div
//                 key={rowIndex}
//                 variants={rowVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={rowIndex % 2 === 0 ? "left" : "right"}
//                 transition={{ duration: 1, delay: rowIndex * 0.2 }}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {row.map((gym, index) => (
//                   <GymCard key={gym.id} gym={gym} />
//                 ))}
//               </motion.div>
//             ))}
//           </div>
//         )}

//         <div className="flex justify-center items-center mt-10">
//           <button
//             onClick={handlePrevPage}
//             disabled={currentPage === 1}
//             className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <span className="mx-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>

//         <MapModal
//           isOpen={showMap}
//           onClose={() => setShowMap(false)}
//           gyms={gyms}
//           userLocation={userLocation}
//         />
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default GymCatalog;


import React, { useState, useEffect , useCallback } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "../layouts/Button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoogleMap, LoadScript, useLoadScript } from "@react-google-maps/api";

const MapModal = ({ isOpen, onClose, gyms, userLocation }) => {
  if (!isOpen) return null;

  const mapStyles = {
    height: "70vh",
    width: "100%",
  };

  const center = userLocation ? {
    lat: userLocation.lat,
    lng: userLocation.lng
  } : {
    lat: 31.9539,
    lng: 35.9106
  };

  // Calculate distance between two points in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1); // Distance in km
  };

  // Open in Google Maps
  const openInGoogleMaps = (gymLat, gymLng) => {
    const url = userLocation 
      ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${gymLat},${gymLng}`
      : `https://www.google.com/maps/search/?api=1&query=${gymLat},${gymLng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#222] rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl text-white">Nearby Gyms</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">✕</button>
        </div>
        <LoadScript 
          googleMapsApiKey="AIzaSyDM6_CMJoXRbu_cztvxTBqwrf16rI0lc5Y"
          libraries={["marker"]}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            center={center}
            options={{
              styles: [], // Empty array for default white style
              zoomControl: true,
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
            onLoad={(map) => {
              // User marker
              if (userLocation) {
                new google.maps.Marker({
                  position: { lat: userLocation.lat, lng: userLocation.lng },
                  map,
                  title: "Your Location",
                  icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }
                });
              }

              // Gym markers with info windows
              gyms.forEach(gym => {
                if (gym.location?.coordinates) {
                  const gymPosition = {
                    lat: parseFloat(gym.location.coordinates[1]),
                    lng: parseFloat(gym.location.coordinates[0])
                  };

                  const distance = userLocation ? 
                    calculateDistance(
                      userLocation.lat, 
                      userLocation.lng, 
                      gymPosition.lat, 
                      gymPosition.lng
                    ) : null;

                  const marker = new google.maps.Marker({
                    position: gymPosition,
                    map,
                    title: gym.name,
                    icon: {
                      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    }
                  });

                  const infoWindow = new google.maps.InfoWindow({
                    content: `
                      <div style="color: black;">
                        <h3 style="font-weight: bold; margin-bottom: 5px;">${gym.name}</h3>
                        <p style="margin-bottom: 5px;">${gym.city}</p>
                        ${distance ? `<p style="margin-bottom: 5px;">Distance: ${distance} km</p>` : ''}
                        <button 
                          onclick="window.open('https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat},${userLocation?.lng}&destination=${gymPosition.lat},${gymPosition.lng}', '_blank')"
                          style="background-color: #3CB347; color: white; padding: 5px 10px; border: none; border-radius: 5px; margin-top: 5px; cursor: pointer;"
                        >
                          Get Directions
                        </button>
                      </div>
                    `
                  });

                  marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                  });
                }
              });

              // Add distance legend if user location is available
              if (userLocation) {
                const legend = document.createElement('div');
                legend.style.backgroundColor = 'white';
                legend.style.border = '1px solid #ccc';
                legend.style.borderRadius = '5px';
                legend.style.padding = '10px';
                legend.style.margin = '10px';
                legend.style.fontSize = '12px';

                legend.innerHTML = `
                  <div style="color: black;">
                    <p>🔵 Your Location</p>
                    <p>🔴 Gym Location</p>
                    <p>Click markers for details and directions</p>
                  </div>
                `;

                map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
              }
            }}
          />
        </LoadScript>

        {/* List of gyms with distances */}
        <div className="mt-4 max-h-40 overflow-y-auto">
          {gyms.map(gym => {
            if (!gym.location?.coordinates) return null;
            
            const distance = userLocation ? 
              calculateDistance(
                userLocation.lat,
                userLocation.lng,
                parseFloat(gym.location.coordinates[1]),
                parseFloat(gym.location.coordinates[0])
              ) : null;

            return (
              <div 
                key={gym.id} 
                className="flex justify-between items-center p-2 border-b border-gray-700 text-white"
                onClick={() => openInGoogleMaps(
                  parseFloat(gym.location.coordinates[1]),
                  parseFloat(gym.location.coordinates[0])
                )}
              >
                <div>
                  <p className="font-semibold">{gym.name}</p>
                  <p className="text-sm text-gray-400">{gym.city}</p>
                </div>
                {distance && (
                  <p className="text-sm bg-[#3CB347] px-2 py-1 rounded">
                    {distance} km
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const GymCard = ({ gym }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
    className="bg-[#222] rounded-lg overflow-hidden shadow-lg p-4"
  >
    <img src={gym.image} alt={gym.name} className="h-40 w-full object-cover mb-4 rounded-t-lg" />
    <div className="flex items-center space-x-2 mb-4">
      <span className="bg-[#3CB347] text-white text-sm px-1.5 py-0.5 rounded animate-pulse">{gym.averageRating}</span>
      <h3 className="text-xl mb-2 text-white mt-2">{gym.name}</h3>
    </div>
    <p className="text-gray-300 mb-4">{gym.city}</p>
    <div className="flex justify-between">
  <p className={`w-20 text-center ${
    gym.isOpen 
      ? "text-[#3CB347] border-2 border-[#3CB347]" 
      : "text-red-500 border-2 border-red-500"
    } rounded-full p-2`}
  >
    {gym.isOpen ? "Open" : "Closed"}
  </p>
      <p className="text-gray-300">
        {gym.isOpen ? `Closes at ${gym.closeTime}` : `Opens at ${gym.openTime}`}
      </p>
    </div>
    <div className="flex justify-center mt-5">
      <Link to={`/gymdetails/${gym.id}`}>  
        <Button title="View Details" />
      </Link>
    </div>
  </motion.div>
);

const GymCatalog = () => {
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]); // New state for filtered gyms
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search
  const [selectedCity, setSelectedCity] = useState(""); // New state for city filter
  const gymsPerPage = 6;

  // Add Jordan Governorates
  const jordanGovernorates = [
    "Amman",
    "Irbid",
    "Zarqa",
    "Balqa",
    "Madaba",
    "Karak",
    "Tafilah",
    "Ma'an",
    "Jerash",
    "Ajloun",
    "Aqaba",
    "Mafraq"
  ];

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/gyms/all');
        const formattedGyms = response.data.map(gym => ({
          ...gym,
          location: {
            ...gym.location,
            coordinates: gym.location.coordinates.map(coord => parseFloat(coord))
          }
        }));
        setGyms(formattedGyms);
        setFilteredGyms(formattedGyms); // Initialize filtered gyms
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gyms:", err);
        setError('Failed to fetch gyms');
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setUserLocation({
            lat: 31.9539,
            lng: 35.9106
          });
        }
      );
    }

    fetchGyms();
  }, []);

  // New useEffect for handling search and filter
  useEffect(() => {
    let result = gyms;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(gym => 
        gym.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply city filter
    if (selectedCity) {
      result = result.filter(gym => gym.city === selectedCity);
    }
    
    setFilteredGyms(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedCity, gyms]);

  const indexOfLastGym = currentPage * gymsPerPage;
  const indexOfFirstGym = indexOfLastGym - gymsPerPage;
  const currentGyms = filteredGyms.slice(indexOfFirstGym, indexOfLastGym);

  const totalPages = Math.ceil(filteredGyms.length / gymsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const rowVariants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const rows = currentGyms.reduce((acc, gym, index) => {
    const rowIndex = Math.floor(index / 3);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(gym);
    return acc;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-start gap-5 mb-8">
          <input
            type="text"
            placeholder="Search gyms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] md:w-1/2 lg:w-1/3 px-4 py-2 border border-[#444] rounded-lg"
          />
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full focus:outline-none bg-[#222] focus:ring-2 focus:ring-[#3CB347] md:w-1/4 lg:w-1/6 px-4 py-2 border border-[#444] rounded-lg text-white"
          >
            <option value="">All Cities</option>
            {jordanGovernorates.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowMap(true)}
            className="px-4 py-2 bg-[#3CB347] text-white rounded-lg hover:bg-[#2ea23a] transition-colors"
          >
            View on Map
          </button>
        </div>
        {rows.length > 0 && (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={rowIndex}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                custom={rowIndex % 2 === 0 ? "left" : "right"}
                transition={{ duration: 1, delay: rowIndex * 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {row.map((gym, index) => (
                  <GymCard key={gym.id} gym={gym} />
                ))}
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="mx-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 text-white bg-[#3CB347] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        <MapModal
          isOpen={showMap}
          onClose={() => setShowMap(false)}
          gyms={filteredGyms} // Updated to use filtered gyms in map
          userLocation={userLocation}
        />
      </div>
      <Footer />
    </>
  );
};

export default GymCatalog;