const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Sprint",
  password: "admin",
  port: 5433,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error connecting to PostgreSQL database:', err);
  }
  console.log('Connected to PostgreSQL database');
  release(); // Release the client back to the pool
});
console.log('Index.js is running...');

module.exports = pool;
