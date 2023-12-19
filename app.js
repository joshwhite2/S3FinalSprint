
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
const port = 3000;

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
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index.ejs', { name: req.user ? req.user.username : null });
});



async function getUser(userId) {
  // Implementation depends on your data source
  // This is just a placeholder
  return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      hobbies: ['Reading', 'Coding', 'Hiking']
  };
}
app.get('/profile/:userId', checkAuthenticated, async (req, res) => {
  const user = await getUser(req.params.userId);
  res.render('profile.ejs', { user });
});

app.get('/query/:word', checkAuthenticated, async (req, res) => {
  const results = await logins.findByQuery(req.params.word);
  res.json(results);
});

// Passport checkNotAuthenticated() middleware.
// This middleware is only for the login and register. If someone stumbles 
// upon these routes they only need access if they are NOT authenticated. 
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('index.ejs');
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/sample2',
  failureFlash: true
}));

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
});

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let result = await logins.addLogin(req.body.name, req.body.email, hashedPassword, uuid.v4());
      res.redirect('/register');
  } catch(error) {
      console.log(error);
      res.redirect('/login');
  }
});

app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

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



// Routes
const indexRoutes = require('./src/routes/index');  // Update the path
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
