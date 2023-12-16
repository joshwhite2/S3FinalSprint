const path = require('path');
const express = require('express');
const app = express();
const port = 3000; // choose a port number

// Set up EJS for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Define static folder for assets (if needed)

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
console.log("hello")
// Routes
const indexRoutes = require('./src/routes/index');  // Update the path
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
