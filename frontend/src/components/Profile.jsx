import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCreditCard, FaCalendarAlt, FaTicketAlt, FaDumbbell, FaClock } from "react-icons/fa";
import Button from "../layouts/Button";
import axios from "axios";

const slideInUp = {
  animationName: 'slideInUp',
  animationDuration: '1s',
  animationTimingFunction: 'ease-out',
};

const keyframes = `
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Profile = () => {
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    contactNumber: '', 
    password: '', 
    confirmPassword: '',
    currentSubscription: null,
    visits: []
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    axios.get('http://localhost:4000/api/profile', { withCredentials: true })
      .then(response => {
        console.log('Profile response:', response.data);
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Profile error:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:4000/api/profile', user, { withCredentials: true });
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error updating profile');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const TabButton = ({ tab, title }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 ${
        activeTab === tab
          ? 'bg-[#3CB347] text-white'
          : 'bg-[#333] text-[#3CB347] hover:bg-[#444]'
      }`}
    >
      {title}
    </button>
  );

  const UserInfoForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <FaUser className="text-[#3CB347] text-2xl" />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="flex-grow p-3 border bg-[#333] border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-[#3CB347] text-2xl" />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="flex-grow p-3 border bg-[#333] border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <FaPhone className="text-[#3CB347] text-2xl" />
          <input
            type="tel"
            name="contactNumber"
            value={user.contactNumber}
            onChange={handleInputChange}
            placeholder="Phone"
            className="flex-grow p-3 border bg-[#333] border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <FaLock className="text-[#3CB347] text-2xl" />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="flex-grow p-3 border bg-[#333] border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
          />
        </div>
        <div className="flex items-center space-x-4">
          <FaLock className="text-[#3CB347] text-2xl" />
          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className="flex-grow p-3 border bg-[#333] border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
          />
        </div>
        <div className="flex justify-center mt-8">
          <Button title="Save changes" />
        </div>
      </div>
    </form>
  );

  const SubscriptionInfo = () => {
    const subscription = user.currentSubscription;
    
    if (!subscription || !subscription.subscription) {
      return (
        <div className="text-center py-8 text-white">
          <p className="text-xl mb-4">No active subscription</p>
          <Button title="Browse Plans" />
        </div>
      );
    }

    return (
      <div className="space-y-6 text-white">
        <div className="bg-[#333] p-6 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <FaCreditCard className="text-[#3CB347] text-2xl" />
            <h3 className="text-xl font-semibold">Current Plan Details</h3>
          </div>
          <div className="pl-9 space-y-3">
            <p>Plan Name: <span className="text-[#3CB347]">{subscription.subscription.name}</span></p>
            <p>Total Visits: <span className="text-[#3CB347]">{subscription.subscription.totalVisits}</span></p>
            <p>Price: <span className="text-[#3CB347]">${subscription.subscription.price}</span></p>
            <p>Duration: <span className="text-[#3CB347]">{subscription.subscription.durationInDays} days</span></p>
          </div>
        </div>
        
        <div className="bg-[#333] p-6 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <FaTicketAlt className="text-[#3CB347] text-2xl" />
            <h3 className="text-xl font-semibold">Usage Details</h3>
          </div>
          <div className="pl-9 space-y-3">
            <p>Remaining Visits: <span className="text-[#3CB347]">{subscription.remainingVisits}</span></p>
            <div className="w-full bg-[#444] rounded-full h-2 mt-2">
              <div 
                className="bg-[#3CB347] h-2 rounded-full" 
                style={{ 
                  width: `${(subscription.remainingVisits / subscription.subscription.totalVisits) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-[#333] p-6 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <FaCalendarAlt className="text-[#3CB347] text-2xl" />
            <h3 className="text-xl font-semibold">Subscription Period</h3>
          </div>
          <div className="pl-9 space-y-3">
            <p>Start Date: <span className="text-[#3CB347]">{formatDate(subscription.createdAt)}</span></p>
            <p>Expiry Date: <span className="text-[#3CB347]">{formatDate(subscription.expiresAt)}</span></p>
          </div>
        </div>
      </div>
    );
  };

  const VisitedGyms = () => {
    if (!user.visits || user.visits.length === 0) {
      return (
        <div className="text-center py-8 text-white">
          <p className="text-xl mb-4">No gym visits recorded yet</p>
          <Button title="Explore Gyms" />
        </div>
      );
    }

    return (
      <div className="space-y-6 text-white">
        <div className="grid gap-4">
          {user.visits.map((visit, index) => (
            <div key={index} className="bg-[#333] p-6 rounded-lg hover:bg-[#3a3a3a] transition-colors duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <FaDumbbell className="text-[#3CB347] text-2xl flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-[#3CB347]">
                      {visit.gymSectionId.gymId.gymName}
                    </h3>
                    <p className="text-gray-400 mt-1">
                      {visit.gymSectionId.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FaClock className="mr-2" />
                  {formatDateTime(visit.visitDateTime)}
                </div>
              </div>
              <div className="mt-4 pl-10">
                <p className="text-gray-300">{visit.gymSectionId.description}</p>
                <p className="text-gray-400 mt-2">
                  Phone: {visit.gymSectionId.phoneNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black">
      <Navbar />
      <style>{keyframes}</style>
      <div className="flex-grow flex flex-col items-center justify-center pt-20 md:pt-32 px-5">
        {loading ? (
          <div className="text-white text-center">Loading profile...</div>
        ) : (
          <div className="bg-[#222] mb-20 shadow-lg rounded-lg p-8 w-full max-w-3xl duration-500 hover:scale-105" style={slideInUp}>
            <h2 className="text-4xl font-bold text-center mb-6 text-[#3CB347]">Profile</h2>
            
            <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-y-4">
              <TabButton tab="profile" title="User Information" />
              <TabButton tab="subscription" title="Current Subscription" />
              <TabButton tab="visits" title="Visited Gyms" />
            </div>

            {message && <p className="text-center text-[#3CB347] mb-6">{message}</p>}
            
            {activeTab === 'profile' ? <UserInfoForm /> : 
             activeTab === 'subscription' ? <SubscriptionInfo /> : 
             <VisitedGyms />}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;