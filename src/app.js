const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportGoogleOAuth2 = require('passport-google-oauth20');
const bodyParser = require('body-parser');
const session = require('express-session');

const User = require('./model/users');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: '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', // Change this to a secure secret key
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/store', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/home', (req, res) => {
    res.send('Welcome to store');
});
// Routes
app.use('/products', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Passport.js setup
passport.use(new passportGoogleOAuth2.Strategy({
  clientID: '788921873837-ecmml2j9giuplpm09plpuekmd1221j2j.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
      // Check if the user exists in your database
      let user = await User.findOne({ googleId: profile.id });
      const fullName = `${profile.name.givenName} ${profile.name.familyName}`;

      // If user does not exist, create a new user
      if (!user) {
          user = await User.create({
              email: profile.emails[0].value,
              name: fullName,
              role: 'STORE_OWNER'
              // You can store additional user information here
          });
      }

      // Pass the user to the done callback to signal successful authentication
      done(null, user);
  } catch (error) {
      done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
