const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes'); 
const contactRoutes = require('./src/routes/contactRoutes'); 
const profileRoutes = require('./src/routes/profileRoutes'); 
const gymRoutes = require('./src/routes/gymRoutes');
const commentRatingRoutes = require('./src/routes/commentRating');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const visitsRoutes = require('./src/routes/visitsRoutes');
const userRoutes = require('./src/routes/usersRoutes'); 
const dietRoutes = require('./src/routes/dietRoutes');


const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Connect to MongoDB
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/contact', contactRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/gyms', gymRoutes);
app.use('/api/comment-ratings', commentRatingRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', paymentRoutes);
app.use('/api/visits', visitsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/diet', dietRoutes);



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
