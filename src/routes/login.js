const express = require('express');
const router = express.Router();
console.log("Executing login.js");
const logins = require('../../Services/pg.logins.dal');
router.get('/register', (req, res) => {
    res.render('register'); // Update with your actual view name
  });
  
  // Registration Process
 
  
  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const uuidv4 = uuid.v4();
      await logins.addLogin(name, email, hashedPassword, uuidv4);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.redirect('/login'); 
    }
  });
  
  // Login Page
  router.get('/login', (req, res) => {
    res.render('login'); // Update with your actual view name
  });
  
  // Login Process
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile', // Update with your desired redirect path
    failureRedirect: '/login',
    failureFlash: true
  }));
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login'); // Update with your desired redirect path
  });
  
  module.exports = router;