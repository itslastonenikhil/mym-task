const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');
dotenv.config();

require('./config/passport')
const app = express();
console.log(process.env.SESSION_SECRET)
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Add this middleware for session serialization/deserialization
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// passport.serializeUser((user, done) => {
//   console.log("Serializing user:", user);
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   console.log("Deserializing user with ID:", id);
//   User.findById(id, (err, user) => {
//     console.log("Deserialized user data:", user);
//     done(err, user);
//   });
// });



// Database configuration

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/auth', require('./routes/authRoutes'));
// Add other routes as needed

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
