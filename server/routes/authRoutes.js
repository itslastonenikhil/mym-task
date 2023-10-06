// server/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as needed


const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.get("/", (req, res)=>{
  res.send("test auth")
})

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed",
}));

// Registration route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already taken.' });
      }
  
      // Hash the password before saving it to the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Registration failed.' });
        }
        return res.status(201).json({ message: 'Registration successful.', user: newUser });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed.' });
    }
  });

// Login route for username/password authentication

// Login route for username/password authentication
router.post('/login', async (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Compare the provided password with the hashed password in the database
      const { username, password } = req.body;
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        // console.log(user);
        return res.status(200).json({ message: 'Login successful.', user });
      });
    })(req, res, next);
  });



// Logout route


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect(CLIENT_URL);
  });
});

// Current user route
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
