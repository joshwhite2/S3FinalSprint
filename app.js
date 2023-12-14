
const path = require('path');


// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'your_postgres_user',
//   host: 'localhost',
//   database: 'your_database_name',
//   password: 'your_password',
//   port: 5432,
// });

// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error connecting to PostgreSQL:', err);
//   } else {
//     console.log('Connected to PostgreSQL at:', res.rows[0].now);
//   }
// });


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/your_database_name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB!');
// });

const express = require('express');
const app = express();
const port = 3000; // choose a port number

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define static folder for assets (if needed)
app.use(express.static('public'));

// Set up EJS for views
app.set('view engine', 'ejs');



// Routes
const indexRoutes = require('/Users/keyinstudent/Desktop/FinalSprint_Term3/src/routes/index.js');
app.use('/', indexRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Set up EJS for views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
