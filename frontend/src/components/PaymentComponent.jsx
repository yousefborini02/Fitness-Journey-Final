// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Swal from 'sweetalert2';
// import { color } from "framer-motion";

// const stripePromise = loadStripe('pk_test_51Q5uMT2NqZ4ONns4zgBn37lUKhqij8zRABSJQyIb6RsfAmLccP04RZmesUhxHMTHq93rBNDMaaIFQljEOCrUC8VY00SMexEk5c');

// const CheckoutForm = ({ subscription }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const { data } = await axios.post('http://localhost:4000/api/create-payment-intent', {
//         subscriptionId: subscription._id
//       }, { withCredentials: true });

//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         }
//       });

//       if (result.error) {
//         setError(result.error.message);
//         Swal.fire('Error', result.error.message, 'error');
//       } else {
//         // Payment successful, confirm payment on backend
//         await axios.post('http://localhost:4000/api/confirm-payment', {
//           paymentIntentId: result.paymentIntent.id
//         }, { withCredentials: true });

//         console.log('Payment successful');
//         Swal.fire({
//           title: 'Success',
//           text: 'Payment successful!',
//           icon: 'success',
//           confirmButtonColor: '#3CB347'
//         });        navigate('/');
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         Swal.fire('Error', 'Please login to continue', 'error');
//         navigate('/login');
//       } else if (error.response && error.response.status === 400) {
//         Swal.fire('Error', error.response.data.message, 'error');
//       } else {
//         Swal.fire('Error', 'An error occurred. Please try again.', 'error');
//       }
//       setError('An error occurred. Please try again.');
//     }

//     setProcessing(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="animate-slideInUp">
//         <label className="block text-sm font-medium mb-1">Credit Card</label>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: '16px',
//                 color: '#ffffff',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             },
//           }}
//           className="w-full px-4 py-2 bg-[#333] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//         />
//       </div>
//       <div className="animate-slideInUp">
//         <label className="block text-sm font-medium mb-1">Name on Card</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 bg-[#333] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//           placeholder="John Doe"
//         />
//       </div>
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//         <div className="w-full md:w-1/2 animate-slideInUp">
//           <label className="block text-sm font-medium mb-1">Expiry Date</label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 bg-[#333] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//             placeholder="MM / YY"
//           />
//         </div>
//         <div className="w-full md:w-1/2 animate-slideInUp">
//           <label className="block text-sm font-medium mb-1">CVV Code</label>
//           <input
//             type="text"
//             className="w-full px-4 py-2 bg-[#333] text-white border border-[#333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347]"
//             placeholder="123"
//           />
//         </div>
//       </div>
//       {error && <div className="text-red-500">{error}</div>}
//       <div className="flex flex-col space-y-4 mt-6">
//         <button
//           type="submit"
//           disabled={!stripe || processing}
//           className="w-full bg-[#3CB347] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347] focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105"
//         >
//           {processing ? 'Processing...' : 'Pay Now'}
//         </button>
//         <button
//           type="button"
//           className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105"
//         >
//           Pay with PayPal
//         </button>
//       </div>
//     </form>
//   );
// };

// const PaymentComponent = () => {
//   const [animate, setAnimate] = useState(false);
//   const [subscription, setSubscription] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     setAnimate(true);

//     const fetchSubscription = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/subscriptions/${id}`);
//         setSubscription(response.data);
//       } catch (error) {
//         console.error('Error fetching subscription:', error);
//         Swal.fire('Error', 'Failed to fetch subscription details', 'error');
//       }
//     };

//     const checkExistingSubscription = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/user/subscription', { withCredentials: true });
//         if (response.data.hasSubscription) {
//           Swal.fire({
//             title: 'Existing Subscription',
//             text: 'You already have an active subscription. Do you want to view your current subscription details?',
//             icon: 'info',
//             showCancelButton: true,
//             confirmButtonText: 'View Subscription',
//             cancelButtonText: 'Stay Here',
//             confirmButtonColor:'#3CB347',
//             cancelButtonColor:'#3CB347'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               navigate('/');
//             }
//           });
//         }
//       } catch (error) {
//         console.error('Error checking existing subscription:', error);
//       }
//     };

//     fetchSubscription();
//     checkExistingSubscription();
//   }, [id, navigate]);

//   if (!subscription) {
//     return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-black">
//       <style>
//         {`
//           @keyframes slideInUp {
//             from {
//               opacity: 0;
//               transform: translateY(100%);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-slideInUp {
//             animation: slideInUp 1s ease-out;
//           }
//         `}
//       </style>
//       <Navbar />
//       <div className="flex-grow flex items-center justify-center mt-32 mb-20">
//         <div
//           className={`max-w-5xl w-full bg-[#222] text-white rounded-lg shadow-lg p-8 transform transition-transform duration-500 hover:scale-105 ${
//             animate ? "animate-slideInUp" : ""
//           }`}
//         >
//           <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
//             <div className="w-full md:w-2/3">
//               <h2 className="text-2xl text-[#3CB347] font-bold mb-6 text-center md:text-left">Complete Your Purchase</h2>
//               <Elements stripe={stripePromise}>
//                 <CheckoutForm subscription={subscription} />
//               </Elements>
//             </div>

//             <div className="w-full md:w-1/3 mt-0 md:mt-0 md:ml-8 animate-slideInUp">
//               <h3 className="text-lg text-[#3CB347] font-semibold mb-4 text-center md:text-left">Your Plan</h3>
//               <div className="bg-[#333] p-4 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
//                 <p className="text-md mb-2 font-bold">{subscription.name}</p>
//                 <div className="flex justify-between items-center mb-2">
//                   <span>Total Visits</span>
//                   <span className="font-bold">{subscription.totalVisits}</span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span>Duration</span>
//                   <span className="font-bold">{Math.floor(subscription.durationInDays / 30)} months</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Total price</span>
//                   <span className="font-bold">{subscription.price.toFixed(2)} JD</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PaymentComponent;





import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from 'sweetalert2';
import { color } from "framer-motion";

const stripePromise = loadStripe('pk_test_51Q5uMT2NqZ4ONns4zgBn37lUKhqij8zRABSJQyIb6RsfAmLccP04RZmesUhxHMTHq93rBNDMaaIFQljEOCrUC8VY00SMexEk5c');

const ELEMENT_STYLES = {
  base: {
    fontSize: '16px',
    color: '#ffffff',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#eb1c26',
  }
};

const CheckoutForm = ({ subscription }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!elements) return;

    const elementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: '#ffffff',
          '::placeholder': {
            color: '#aab7c4',
          },
          backgroundColor: '#333',
          padding: '10px',
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      },
    };

    const cardNumber = elements.create('cardNumber', {
      ...elementOptions,
      showIcon: true,
      placeholder: '1234 1234 1234 1234'
    });
    const cardExpiry = elements.create('cardExpiry', elementOptions);
    const cardCvc = elements.create('cardCvc', elementOptions);

    // Mount elements
    cardNumber.mount('#cardNumber');
    cardExpiry.mount('#cardExpiry');
    cardCvc.mount('#cardCvc');

    // Add event listeners for changes
    const handleChange = (event) => {
      if (event.error) {
        setError(event.error.message);
      } else {
        setError(null);
      }
    };

    cardNumber.on('change', handleChange);
    cardExpiry.on('change', handleChange);
    cardCvc.on('change', handleChange);

    // Cleanup function
    return () => {
      cardNumber.destroy();
      cardExpiry.destroy();
      cardCvc.destroy();
    };
  }, [elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent
      const { data } = await axios.post('http://localhost:4000/api/create-payment-intent', {
        subscriptionId: subscription._id
      }, { withCredentials: true });

      // Get the card element
      const cardElement = elements.getElement('cardNumber');

      // Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      // Confirm on backend
      await axios.post('http://localhost:4000/api/confirm-payment', {
        paymentIntentId: paymentIntent.id,
        subscriptionId: subscription._id
      }, { withCredentials: true });

      Swal.fire({
        title: 'Success',
        text: 'Payment successful!',
        icon: 'success',
        confirmButtonColor: '#3CB347'
      }).then(() => {
        navigate('/');
      });

    } catch (error) {
      console.error('Payment error:', error);
      if (error.response?.status === 401) {
        Swal.fire('Error', 'Please login to continue', 'error');
        navigate('/login');
      } else {
        Swal.fire('Error', error.message || 'Payment failed. Please try again.', 'error');
      }
      setError(error.message || 'An error occurred. Please try again.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="animate-slideInUp">
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <div className="w-full bg-[#333] text-white border border-[#333] rounded-md focus-within:ring-2 focus-within:ring-[#3CB347] min-h-[40px] relative">
          <div id="cardNumber" className="p-3 absolute inset-0" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 animate-slideInUp">
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <div className="w-full bg-[#333] text-white border border-[#333] rounded-md focus-within:ring-2 focus-within:ring-[#3CB347] min-h-[40px] relative">
            <div id="cardExpiry" className="p-3 absolute inset-0" />
          </div>
        </div>

        <div className="w-full md:w-1/2 animate-slideInUp">
          <label className="block text-sm font-medium mb-1">CVC</label>
          <div className="w-full bg-[#333] text-white border border-[#333] rounded-md focus-within:ring-2 focus-within:ring-[#3CB347] min-h-[40px] relative">
            <div id="cardCvc" className="p-3 absolute inset-0" />
          </div>
        </div>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex flex-col space-y-4 mt-6">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full bg-[#3CB347] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB347] focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105 disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
        {/* <button
          type="button"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transform transition-transform duration-300 hover:scale-105"
        >
          Pay with PayPal
        </button> */}
      </div>
    </form>
  );
};

const PaymentComponent = () => {
  const [animate, setAnimate] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    const fetchSubscription = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/subscriptions/${id}`);
        setSubscription(response.data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
        Swal.fire('Error', 'Failed to fetch subscription details', 'error');
      }
    };

    const checkExistingSubscription = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/subscription', { withCredentials: true });
        if (response.data.hasSubscription) {
          Swal.fire({
            title: 'Existing Subscription',
            text: 'You already have an active subscription. Do you want to view your current subscription details?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'View Subscription',
            cancelButtonText: 'Stay Here',
            confirmButtonColor:'#3CB347',
            cancelButtonColor:'#3CB347'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/');
            }
          });
        }
      } catch (error) {
        console.error('Error checking existing subscription:', error);
      }
    };

    fetchSubscription();
    checkExistingSubscription();
  }, [id, navigate]);

  if (!subscription) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <style>
        {`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideInUp {
            animation: slideInUp 1s ease-out;
          }
        `}
      </style>
      <Navbar />
      <div className="flex-grow flex items-center justify-center mt-32 mb-20">
        <div
          className={`max-w-5xl w-full bg-[#222] text-white rounded-lg shadow-lg p-8 transform transition-transform duration-500 hover:scale-105 ${
            animate ? "animate-slideInUp" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl text-[#3CB347] font-bold mb-6 text-center md:text-left">Complete Your Purchase</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm subscription={subscription} />
              </Elements>
            </div>

            <div className="w-full md:w-1/3 mt-0 md:mt-0 md:ml-8 animate-slideInUp">
              <h3 className="text-lg text-[#3CB347] font-semibold mb-4 text-center md:text-left">Your Plan</h3>
              <div className="bg-[#333] p-4 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
                <p className="text-md mb-2 font-bold">{subscription.name}</p>
                <div className="flex justify-between items-center mb-2">
                  <span>Total Visits</span>
                  <span className="font-bold">{subscription.totalVisits}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Duration</span>
                  <span className="font-bold">{Math.floor(subscription.durationInDays / 30)} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total price</span>
                  <span className="font-bold">{subscription.price.toFixed(2)} JD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentComponent;