const express = require('express');
const router = express.Router();
// const { Pool } = require('pg'); // Import PostgreSQL
// const mongoose = require('mongoose'); // Import MongoDB

// PostgreSQL configuration (commented out for testing)
// const postgresPool = new Pool({
//   user: 'your_postgres_user',
//   host: 'localhost',
//   database: 'your_database_name',
//   password: 'your_password',
//   port: 5432,
// });
// res.render('index'); // This assumes 'index.ejs' is the correct filename

// MongoDB configuration (commented out for testing)
// mongoose.connect('mongodb://localhost:27017/your_mongodb_database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Define routes
router.get('/', (req, res) => {
  res.render('index'); // render your main page (home or login/signup)
});

// Hardcoded mock data for testing
const postgresMockData = [
  { id: 1, name: 'Postgres Result 1', description: 'Description for Postgres Result 1' },
  { id: 2, name: 'Postgres Result 2', description: 'Description for Postgres Result 2' },
  // Add more mock data as needed
];

const mongoMockData = [
  { _id: 1, title: 'Mongo Result 1', content: 'Content for Mongo Result 1' },
  { _id: 2, title: 'Mongo Result 2', content: 'Content for Mongo Result 2' },
  // Add more mock data as needed
];

// Handle search requests
router.post('/search', async (req, res) => {
  const { query, source } = req.body;

  try {
    let results;

    if (source === 'postgres') {
      // Use the hardcoded mock data for PostgreSQL
      results = postgresMockData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    } else if (source === 'mongo') {
      // Use the hardcoded mock data for MongoDB
      results = mongoMockData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
    } else if (source === 'both') {
      // Implement the logic to query both databases and combine the results
      // ...
    } else {
      throw new Error('Invalid data source');
    }

    res.render('search-results', { results });
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
