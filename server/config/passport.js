// server/config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
const dotenv = require('dotenv')
dotenv.config();

// Local Strategy for username/password authentication
passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Invalid username or password.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid username or password.' });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://mym-task-ruby.vercel.app/google/callback",
    },


    async (accessToken, refreshToken, profile, done) => {
      // Check if user already exists in the database
      // console.log(profile)
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      // Create a new user if they don't exist
      const user = await new User({ googleId: profile.id , username: profile.emails[0].value}).save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize only the user's ID to the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Deserialize user by fetching from the database using the user's ID
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


