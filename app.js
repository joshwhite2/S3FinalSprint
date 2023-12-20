
if( process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const uuid = require('uuid')
const logins = require('./Services/pg.logins.dal') // use POSTGRESQL dal
const localStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const app = express();
const port = 3001;

// Set up EJS for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.use(new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
  let user = await logins.getLoginByEmail(email);
  if( user == null ) {
      return done(null, false, {message: 'No user with that email.'})
  }
  try {
      if( await bcrypt.compare(password, user.password)) {
          return done(null, user); 
      } else {
          return done(null, false, {message: 'Incorrect password was entered.'});
      }
  } catch (error) {
      return done(error);
  }
}))
passport.serializeUser((user, done) => {
  done(null, user._id)
});
passport.deserializeUser( async (id, done) => {
  let user = await logins.getLoginById(id);
  if(DEBUG) console.log('passport.deserializeUser: ' + user);
  done(null, user);
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Define static folder for assets (if needed)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flash());

app.get('/', (req, res) => {
  res.render('index.ejs', { name: req.user ? req.user.username : null });
});

app.get('/404', (req, res) => {
  res.render('404.ejs');})


   async function getUser(userId) {
    const user = await logins.getLoginById(userId);
    console.log('Fetched user:', user);
  return user;
};
 
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('index.ejs');
  });

  app.get('/profile/:userId', checkAuthenticated, async (req, res) => {
    const user = await getUser(req.params.userId);
    res.render('profile.ejs', { user });
    console.log(`{user}`)});

  app.get('/profile', checkAuthenticated, async (req, res) => {
    const user = await getUser(req.user._id); // Use req.user._id
    res.render('profile.ejs', { user });
    console.log('Reached /profile route');
  });

  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect:'/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));
  function checkAuthenticated(req, res, next) {
    if ( req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  }
  function checkNotAuthenticated(req, res, next) {
    if ( req.isAuthenticated()) {
        return res.redirect('/');
    }
    return next();}
  

  
  app.get('/query/:word', checkAuthenticated, async (req, res) => {
    const results = await logins.findByQuery(req.params.word);
    res.json(results);
  });




app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let result = await logins.addLogin(req.body.name, req.body.email, hashedPassword, uuid.v4());
    res.redirect('/login');
  } catch (error) {
    req.flash('error', 'Registration failed. Please try again.'); // Flash an error message
    res.redirect('/register'); // Redirect back to the registration page on failure
  }
});

app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});






// Routes
const indexRoutes = require('./src/routes/index');  // Update the path
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

