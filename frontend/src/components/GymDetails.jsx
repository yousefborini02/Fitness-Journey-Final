// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";
// import { FaPhone, FaFacebook, FaInstagram, FaStar, FaStarHalfAlt, FaClock, FaMapMarkerAlt,FaComment } from "react-icons/fa";
// import Button from "../layouts/Button";

// const CustomArrow = ({ className, style, onClick, direction }) => {
//   const arrowPath =
//     direction === "left"
//       ? "M15.75 19.5L8.25 12l7.5-7.5"
//       : "M8.25 4.5L15.75 12l-7.5 7.5";

//   return (
//     <div
//       className={`${className} hover:scale-110 transition-transform duration-300`}
//       onClick={onClick}
//       style={{
//         ...style,
//         display: "block",
//         background: "rgba(0, 0, 0, 0.5)",
//         borderRadius: "50%",
//         zIndex: 1,
//         padding: "10px",
//         cursor: "pointer",
//         position: "absolute",
//         top: "50%",
//         transform: "translateY(-50%)",
//         ...(direction === "left" ? { left: "-40px" } : { right: "-40px" }),
//       }}
//     >
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d={arrowPath} stroke="white" strokeWidth="2" />
//       </svg>
//     </div>
//   );
// };

// const GymDetails = () => {
//   const { id } = useParams();
//   const [gym, setGym] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newRating, setNewRating] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);

//   useEffect(() => {
//     const fetchGymDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/gyms/${id}`);
//         setGym(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch gym details');
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
//         setComments(response.data.commentRatings);
//         setAverageRating(response.data.averageRating);
//       } catch (err) {
//         console.error('Failed to fetch comments', err);
//       }
//     };

//     fetchGymDetails();
//     fetchComments();
//   }, [id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/comment-ratings', {
//         gymId: id,
//         comment: newComment,
//         rating: newRating
//       }, {
//         withCredentials: true
//       });
      
//       // Fetch updated comments and average rating
//       const updatedCommentsResponse = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
//       setComments(updatedCommentsResponse.data.commentRatings);
//       setAverageRating(updatedCommentsResponse.data.averageRating);
      
//       setNewComment("");
//       setNewRating(0);
//     } catch (err) {
//       console.error('Failed to submit comment', err);
//     }
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: true,
//     // prevArrow: <CustomArrow direction="left" />,
//     // nextArrow: <CustomArrow direction="right" />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen bg-black text-white">{error}</div>;
//   if (!gym) return <div className="flex justify-center items-center h-screen bg-black text-white">Gym not found</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="bg-black text-white pt-20 min-h-screen">
//         {/* Image Slider */}
//         <div className="relative mx-4 lg:mx-16 mb-16">
//           <Slider {...settings}>
//             {gym.images.map((image, index) => (
//               <div key={index} className="p-2">
//                 <motion.img
//                   src={image}
//                   alt={`image ${index + 1}`}
//                   className="h-64 w-full object-cover rounded-lg cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setSelectedImage(image)}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Content Below Slider */}
//         <div className="container mx-auto px-4">
//           {/* Gym Name and Ratings */}
//           <motion.div 
//             className="flex flex-col lg:items-start mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-5xl font-bold text-[#3CB347] mb-4 lg:mb-0 lg:mr-4">{gym.name}</h1>
//             <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 mt-4">
//               <motion.div 
//                 className="flex items-center space-x-2"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <FaStar className="text-[#3CB347]" />
//                 <span className="text-white">User Rating:</span>
//                 <span className="bg-[#3CB347] text-white px-3 py-1 rounded-full">{averageRating}</span>
//               </motion.div>
//               <motion.div 
//                 className="flex items-center space-x-2"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <FaComment className="text-[#3CB347]" />
//                 <span>Comments: {comments.length}</span>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Working Hours and Contact Information */}
//           <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-12">
//             {/* Working Hours */}
//             <motion.div 
//               className="lg:w-1/2 bg-[#222] rounded-lg p-6 mb-8"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
//                 <FaClock className="mr-2" /> Working Hours
//               </h2>
//               <table className="w-full "> 
//                 <tbody>
//                   {gym.workingHours.map((day, index) => (
//                     <tr key={index} className="border-b border-gray-700">
//                       <td className="py-2">{day.day}</td>
//                       <td className="py-2 text-right">{day.openTime} - {day.closeTime}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </motion.div>

//             {/* Contact Information and Location */}
//             <motion.div 
//               className="lg:w-1/2"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="bg-[#222] rounded-lg p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Contact Information</h2>
//                 <div className="space-y-4">
//                   <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                     <FaPhone className="text-[#3CB347]" />
//                     <span>{gym.phoneNumber}</span>
//                   </motion.div>
//                   {gym.facebookUrl && (
//                     <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                       <FaFacebook className="text-blue-500" />
//                       <a href={gym.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Facebook</a>
//                     </motion.div>
//                   )}
//                   {gym.instagramUrl && (
//                     <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                       <FaInstagram className="text-pink-500" />
//                       <a href={gym.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">Instagram</a>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>

//               {/* Google Map Embed */}
//               <div>
//                 <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
//                   <FaMapMarkerAlt className="mr-2" /> Gym Location
//                 </h2>
//                 <div className="rounded-lg overflow-hidden">
//                   <iframe
//                     src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.408876060918!2d${gym.location.coordinates[0]}!3d${gym.location.coordinates[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzE0LjIiTiAzNcKwNTMnNTcuNSJF!5e0!3m2!1sen!2s!4v1691505168046!5m2!1sen!2s`}
//                     width="100%"
//                     height="300"
//                     style={{ border: "0" }}
//                     allowFullScreen=""
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Comments and Ratings */}
//           <motion.div 
//             className="mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Comments and Ratings ({comments.length})</h2>
//             <div className="border-b border-gray-600 my-4"></div>
            
//             {/* New Comment Form */}
//             <form onSubmit={handleCommentSubmit} className="mb-8">
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Leave your comment"
//                 className="w-full h-24 py-3 px-5 rounded-lg bg-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg transition-all duration-300 ease-in-out mb-4"
//               />
//               <div className="flex space-x-2 mb-4">
//                 {[...Array(10)].map((_, index) => (
//                   <motion.span 
//                     key={index} 
//                     whileHover={{ scale: 1.2 }}
//                     className="cursor-pointer"
//                     onClick={() => setNewRating(index + 1)}
//                   >
//                     {index < newRating ? (
//                       <FaStar className="text-[#3CB347]" />
//                     ) : (
//                       <FaStar className="text-gray-400" />
//                     )}
//                   </motion.span>
//                 ))}
//               </div>
//               <Button title="Submit Comment" />
//             </form>

//             {/* Display Comments */}
//             <div className="space-y-4">
//               {comments.map((comment) => (
//                 <div key={comment._id} className="bg-[#222] rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <span className="font-bold">{comment.user.name}</span>
//                   </div>
//                   <p className="mb-2">{comment.comment}</p>
//                   <div className="flex space-x-1">
//                     {[...Array(10)].map((_, index) => (
//                       <FaStar key={index} className={index < comment.rating ? "text-[#3CB347]" : "text-gray-400"} />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Popup */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <motion.img 
//             src={selectedImage} 
//             alt="Selected gym image" 
//             className="max-w-full max-h-full object-contain"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//           />
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default GymDetails;



// ////////////////////////////////////////////////////////////////////






// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";
// import { FaPhone, FaFacebook, FaInstagram, FaStar, FaStarHalfAlt, FaClock, FaMapMarkerAlt, FaComment } from "react-icons/fa";
// import Button from "../layouts/Button";
// import Swal from 'sweetalert2';

// const CustomArrow = ({ className, style, onClick, direction }) => {
//   const arrowPath =
//     direction === "left"
//       ? "M15.75 19.5L8.25 12l7.5-7.5"
//       : "M8.25 4.5L15.75 12l-7.5 7.5";

//   return (
//     <div
//       className={`${className} hover:scale-110 transition-transform duration-300`}
//       onClick={onClick}
//       style={{
//         ...style,
//         display: "block",
//         background: "rgba(0, 0, 0, 0.5)",
//         borderRadius: "50%",
//         zIndex: 1,
//         padding: "10px",
//         cursor: "pointer",
//         position: "absolute",
//         top: "50%",
//         transform: "translateY(-50%)",
//         ...(direction === "left" ? { left: "-40px" } : { right: "-40px" }),
//       }}
//     >
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d={arrowPath} stroke="white" strokeWidth="2" />
//       </svg>
//     </div>
//   );
// };

// const GymDetails = () => {
//   const { id } = useParams();
//   const [gym, setGym] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");
//   const [newRating, setNewRating] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);
//   const [userSubscription, setUserSubscription] = useState(null);

//   useEffect(() => {
//     const fetchGymDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/gyms/${id}`);
//         setGym(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch gym details');
//         setLoading(false);
//       }
//     };

//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
//         setComments(response.data.commentRatings);
//         setAverageRating(response.data.averageRating);
//       } catch (err) {
//         console.error('Failed to fetch comments', err);
//       }
//     };

//     const fetchUserSubscription = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/users/current-subscription', { withCredentials: true });
//         console.log(response.data);
//         setUserSubscription("response",response.data);
        
//       } catch (err) {
//         console.error('Failed to fetch user subscription', err);
//       }
//     };

//     fetchGymDetails();
//     fetchComments();
//     fetchUserSubscription();
//   }, [id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/comment-ratings', {
//         gymId: id,
//         comment: newComment,
//         rating: newRating
//       }, {
//         withCredentials: true
//       });
      
//       // Fetch updated comments and average rating
//       const updatedCommentsResponse = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
//       setComments(updatedCommentsResponse.data.commentRatings);
//       setAverageRating(updatedCommentsResponse.data.averageRating);
      
//       setNewComment("");
//       setNewRating(0);
//     } catch (err) {
//       console.error('Failed to submit comment', err);
//     }
//   };

//   const handleVisitGym = async () => {
//     const result = await Swal.fire({
//       title: 'Are you sure you want to visit this gym?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3CB347',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, visit gym'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axios.post(`http://localhost:4000/api/visits/record/${id}`, {}, { withCredentials: true });
        
//         Swal.fire({
//           title: 'Visit Recorded!',
//           text: 'We hope you have a nice visit to this gym and dont forget to leave us your feedback.',
//           icon: 'success',
//           confirmButtonColor: '#3CB347'
//         });

//         // Refresh user subscription data
//         // const response = await axios.get('http://localhost:4000/api/users/current-subscription', { withCredentials: true });
//         // setUserSubscription(response.data);
//       } catch (err) {
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to record visit. Please try again.',
//           icon: 'error',
//           confirmButtonColor: '#3CB347'
//         });
//       }
//     }
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrows: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen bg-black text-white">{error}</div>;
//   if (!gym) return <div className="flex justify-center items-center h-screen bg-black text-white">Gym not found</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="bg-black text-white pt-20 min-h-screen">
//         {/* Image Slider */}
//         <div className="relative mx-4 lg:mx-16 mb-16">
//           <Slider {...settings}>
//             {gym.images.map((image, index) => (
//               <div key={index} className="p-2">
//                 <motion.img
//                   src={image}
//                   alt={`image ${index + 1}`}
//                   className="h-64 w-full object-cover rounded-lg cursor-pointer"
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => setSelectedImage(image)}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         {/* Content Below Slider */}
//         <div className="container mx-auto px-4">
//           {/* Gym Name, Ratings, and Visit Button */}
//           <motion.div 
//             className="flex flex-col lg:flex-row justify-between items-start mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div>
//               <h1 className="text-5xl font-bold text-[#3CB347] mb-4">{gym.name}</h1>
//               <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 mt-4">
//                 <motion.div 
//                   className="flex items-center space-x-2"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <FaStar className="text-[#3CB347]" />
//                   <span className="text-white">User Rating:</span>
//                   <span className="bg-[#3CB347] text-white px-3 py-1 rounded-full">{averageRating}</span>
//                 </motion.div>
//                 <motion.div 
//                   className="flex items-center space-x-2"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <FaComment className="text-[#3CB347]" />
//                   <span>Comments: {comments.length}</span>
//                 </motion.div>
//               </div>
//             </div>
//             {userSubscription   && gym.isOpen===true &&(
//               <motion.button
//                 className="bg-[#3CB347] text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-[#2A8F34] transition-colors duration-300 mt-4 lg:mt-0"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleVisitGym}
//               >
//                 Visit Gym ({userSubscription.remainingVisits} visits left)
//               </motion.button>
//             )}
//           </motion.div>

//           {/* Working Hours and Contact Information */}
//           <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-12">
//             {/* Working Hours */}
//             <motion.div 
//               className="lg:w-1/2 bg-[#222] rounded-lg p-6 mb-8"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
//                 <FaClock className="mr-2" /> Working Hours
//               </h2>
//               <table className="w-full "> 
//                 <tbody>
//                   {gym.workingHours.map((day, index) => (
//                     <tr key={index} className="border-b border-gray-700">
//                       <td className="py-2">{day.day}</td>
//                       <td className="py-2 text-right">{day.openTime} - {day.closeTime}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </motion.div>

//             {/* Contact Information and Location */}
//             <motion.div 
//               className="lg:w-1/2"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//             >
//               <div className="bg-[#222] rounded-lg p-6 mb-8">
//                 <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Contact Information</h2>
//                 <div className="space-y-4">
//                   <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                     <FaPhone className="text-[#3CB347]" />
//                     <span>{gym.phoneNumber}</span>
//                   </motion.div>
//                   {gym.facebookUrl && (
//                     <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                       <FaFacebook className="text-blue-500" />
//                       <a href={gym.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Facebook</a>
//                     </motion.div>
//                   )}
//                   {gym.instagramUrl && (
//                     <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
//                       <FaInstagram className="text-pink-500" />
//                       <a href={gym.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">Instagram</a>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>

//               {/* Google Map Embed */}
//               <div>
//                 <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
//                   <FaMapMarkerAlt className="mr-2" /> Gym Location
//                 </h2>
//                 <div className="rounded-lg overflow-hidden">
//                   <iframe
//                     src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3389.408876060918!2d${gym.location.coordinates[0]}!3d${gym.location.coordinates[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU3JzE0LjIiTiAzNcKwNTMnNTcuNSJF!5e0!3m2!1sen!2s!4v1691505168046!5m2!1sen!2s`}
//                     width="100%"
//                     height="300"
//                     style={{ border: "0" }}
//                     allowFullScreen=""
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Comments and Ratings */}
//           <motion.div 
//             className="mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Comments and Ratings ({comments.length})</h2>
//             <div className="border-b border-gray-600 my-4"></div>
            
//             {/* New Comment Form */}
//             <form onSubmit={handleCommentSubmit} className="mb-8">
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Leave your comment"
//                 className="w-full h-24 py-3 px-5 rounded-lg bg-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg transition-all duration-300 ease-in-out mb-4"
//               />
//               <div className="flex space-x-2 mb-4">
//                 {[...Array(10)].map((_, index) => (
//                   <motion.span 
//                     key={index} 
//                     whileHover={{ scale: 1.2 }}
//                     className="cursor-pointer"
//                     onClick={() => setNewRating(index + 1)}
//                   >
//                     {index < newRating ? (
//                       <FaStar className="text-[#3CB347]" />
//                     ) : (
//                       <FaStar className="text-gray-400" />
//                     )}
//                   </motion.span>
//                 ))}
//               </div>
//               <Button title="Submit Comment" />
//             </form>

//             {/* Display Comments */}
//             <div className="space-y-4">
//               {comments.map((comment) => (
//                 <div key={comment._id} className="bg-[#222] rounded-lg p-4">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <span className="font-bold">{comment.user.name}</span>
//                   </div>
//                   <p className="mb-2">{comment.comment}</p>
//                   <div className="flex space-x-1">
//                     {[...Array(10)].map((_, index) => (
//                       <FaStar key={index} className={index < comment.rating ? "text-[#3CB347]" : "text-gray-400"} />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Image Popup */}
//       {selectedImage && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <motion.img 
//             src={selectedImage} 
//             alt="Selected gym image" 
//             className="max-w-full max-h-full object-contain"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3 }}
//           />
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// };

// export default GymDetails;



/////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { 
  FaPhone, 
  FaFacebook, 
  FaInstagram, 
  FaStar, 
  FaStarHalfAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaComment,
  FaDirections 
} from "react-icons/fa";
import Button from "../layouts/Button";
import Swal from 'sweetalert2';
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const CustomArrow = ({ className, style, onClick, direction }) => {
  const arrowPath =
    direction === "left"
      ? "M15.75 19.5L8.25 12l7.5-7.5"
      : "M8.25 4.5L15.75 12l-7.5 7.5";

  return (
    <div
      className={`${className} hover:scale-110 transition-transform duration-300`}
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        zIndex: 1,
        padding: "10px",
        cursor: "pointer",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...(direction === "left" ? { left: "-40px" } : { right: "-40px" }),
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={arrowPath} stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
};

const GymDetails = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [userSubscription, setUserSubscription] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/gyms/${id}`);
        setGym(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gym details');
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
        setComments(response.data.commentRatings);
        setAverageRating(response.data.averageRating);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };

    const fetchUserSubscription = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/current-subscription', { withCredentials: true });
        setUserSubscription(response.data);
      } catch (err) {
        console.error('Failed to fetch user subscription', err);
      }
    };

    // Get user location
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

    fetchGymDetails();
    fetchComments();
    fetchUserSubscription();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/comment-ratings', {
        gymId: id,
        comment: newComment,
        rating: newRating
      }, {
        withCredentials: true
      });
      
      const updatedCommentsResponse = await axios.get(`http://localhost:4000/api/comment-ratings/gym/${id}`);
      setComments(updatedCommentsResponse.data.commentRatings);
      setAverageRating(updatedCommentsResponse.data.averageRating);
      
      setNewComment("");
      setNewRating(0);
    } catch (err) {
      console.error('Failed to submit comment', err);
    }
  };

  const handleStartNavigation = () => {
    if (userLocation && gym) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${gym.location.coordinates[1]},${gym.location.coordinates[0]}`;
      window.open(url, '_blank');
    }
  };

  const handleVisitGym = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to visit this gym?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3CB347',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, visit gym'
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`http://localhost:4000/api/visits/record/${id}`, {}, { withCredentials: true });
        
        Swal.fire({
          title: 'Visit Recorded!',
          text: 'We hope you have a nice visit to this gym and dont forget to leave us your feedback.',
          icon: 'success',
          confirmButtonColor: '#3CB347'
        });
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to record visit. Please try again.',
          icon: 'error',
          confirmButtonColor: '#3CB347'
        });
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-black text-white">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen bg-black text-white">{error}</div>;
  if (!gym) return <div className="flex justify-center items-center h-screen bg-black text-white">Gym not found</div>;

  return (
    <>
      <Navbar />
      <div className="bg-black text-white pt-20 min-h-screen">
        {/* Image Slider */}
        <div className="relative mx-4 lg:mx-16 mb-16">
          <Slider {...settings}>
            {gym.images.map((image, index) => (
              <div key={index} className="p-2">
                <motion.img
                  src={image}
                  alt={`image ${index + 1}`}
                  className="h-64 w-full object-cover rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image)}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Content Below Slider */}
        <div className="container mx-auto px-4">
          {/* Gym Name, Ratings, and Visit Button */}
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-start mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-5xl font-bold text-[#3CB347] mb-4">{gym.name}</h1>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 mt-4">
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaStar className="text-[#3CB347]" />
                  <span className="text-white">User Rating:</span>
                  <span className="bg-[#3CB347] text-white px-3 py-1 rounded-full">{averageRating}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaComment className="text-[#3CB347]" />
                  <span>Comments: {comments.length}</span>
                </motion.div>
              </div>
            </div>
            {userSubscription && gym.isOpen === true && (
              <motion.button
                className="bg-[#3CB347] text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-[#2A8F34] transition-colors duration-300 mt-4 lg:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVisitGym}
              >
                Visit Gym ({userSubscription.remainingVisits} visits left)
              </motion.button>
            )}
          </motion.div>

          {/* Working Hours and Contact Information */}
          <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-12">
           {/* Working Hours */}
             <motion.div 
               className="lg:w-1/2 bg-[#222] rounded-lg p-6 mb-8"
              initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
                <FaClock className="mr-2" /> Working Hours
              </h2>
             <table className="w-full "> 
                <tbody>
                  {gym.workingHours.map((day, index) => (
                    <tr key={index} className="border-b border-gray-700">
                   <td className="py-2">{day.day}</td>
                      <td className="py-2 text-right">{day.openTime} - {day.closeTime}</td>
                    </tr>
                  ))}
               </tbody>
              </table>
            </motion.div>

            {/* Contact Information and Location */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-[#222] rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
                    <FaPhone className="text-[#3CB347]" />
                    <span>{gym.phoneNumber}</span>
                  </motion.div>
                  {gym.facebookUrl && (
                    <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
                      <FaFacebook className="text-blue-500" />
                      <a href={gym.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Facebook</a>
                    </motion.div>
                  )}
                  {gym.instagramUrl && (
                    <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
                      <FaInstagram className="text-pink-500" />
                      <a href={gym.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">Instagram</a>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Updated Google Map Section */}
              <div className="bg-[#222] rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#3CB347] mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Gym Location
                </h2>
                <div className="rounded-lg overflow-hidden mb-4" style={{ height: '400px' }}>
                  <LoadScript googleMapsApiKey=Your key ">
                    <GoogleMap
                      mapContainerStyle={{
                        height: "100%",
                        width: "100%"
                      }}
                      zoom={13}
                      center={{
                        lat: parseFloat(gym.location.coordinates[1]),
                        lng: parseFloat(gym.location.coordinates[0])
                      }}
                      options={{
                        styles: [],
                        zoomControl: true,
                        mapTypeControl: true,
                        streetViewControl: true,
                        fullscreenControl: true,
                      }}
                      onLoad={(map) => {
                        const gymPosition = {
                          lat: parseFloat(gym.location.coordinates[1]),
                          lng: parseFloat(gym.location.coordinates[0])
                        };

                        // Gym marker
                        new google.maps.Marker({
                          position: gymPosition,
                          map,
                          title: gym.name,
                          icon: {
                            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                          }
                        });

                        // User marker if location is available
                        if (userLocation) {
                          new google.maps.Marker({
                            position: userLocation,
                            map,
                            title: "Your Location",
                            icon: {
                              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                            }
                          });

                          // Calculate and set distance
                          const dist = calculateDistance(
                            userLocation.lat,
                            userLocation.lng,
                            gymPosition.lat,
                            gymPosition.lng
                          );
                          setDistance(dist);

                          // Fit bounds to include both markers
                          const bounds = new google.maps.LatLngBounds();
                          bounds.extend(gymPosition);
                          bounds.extend(userLocation);
                          map.fitBounds(bounds);

                          // Draw route
                          const directionsService = new google.maps.DirectionsService();
                          const directionsRenderer = new google.maps.DirectionsRenderer({
                            map: map,
                            suppressMarkers: true
                          });

                          directionsService.route({
                            origin: userLocation,
                            destination: gymPosition,
                            travelMode: google.maps.TravelMode.DRIVING
                          }, (response, status) => {
                            if (status === 'OK') {
                              directionsRenderer.setDirections(response);
                            }
                          });
                        }
                      }}
                    />
                  </LoadScript>
                </div>
                
                {/* Distance and Navigation Button */}
                {userLocation && distance && (
                  <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-[#333] rounded-lg">
                    <div className="text-lg mb-4 md:mb-0">
                      <span className="text-[#3CB347] font-bold">Distance:</span> {distance} km
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartNavigation}
                      className="flex items-center space-x-2 bg-[#3CB347] text-white px-6 py-2 rounded-lg hover:bg-[#2A8F34]"
                    >
                      <FaDirections className="text-xl" />
                      <span>Start Navigation</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Comments and Ratings Section - Remains the same */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-[#3CB347] mb-4">Comments and Ratings ({comments.length})</h2>
            <div className="border-b border-gray-600 my-4"></div>
            
            {/* New Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave your comment"
                className="w-full h-24 py-3 px-5 rounded-lg bg-[#333] text-white focus:outline-none focus:ring-2 focus:ring-[#3CB347] text-lg transition-all duration-300 ease-in-out mb-4"
              />
              <div className="flex space-x-2 mb-4">
                {[...Array(10)].map((_, index) => (
                  <motion.span 
                    key={index} 
                    whileHover={{ scale: 1.2 }}
                    className="cursor-pointer"
                    onClick={() => setNewRating(index + 1)}
                  >
                    {index < newRating ? (
                      <FaStar className="text-[#3CB347]" />
                    ) : (
                      <FaStar className="text-gray-400" />
                    )}
                  </motion.span>
                ))}
              </div>
              <Button title="Submit Comment" />
            </form>

            {/* Display Comments */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment._id} className="bg-[#222] rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold">{comment.user.name}</span>
                  </div>
                  <p className="mb-2">{comment.comment}</p>
                  <div className="flex space-x-1">
                    {[...Array(10)].map((_, index) => (
                      <FaStar key={index} className={index < comment.rating ? "text-[#3CB347]" : "text-gray-400"} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img 
            src={selectedImage} 
            alt="Selected gym image" 
            className="max-w-full max-h-full object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default GymDetails;
