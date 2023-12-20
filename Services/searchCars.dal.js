// function that combines postgres and mongo queries to search for cars
const logSearchAction = require('./src/routes/logging'); // Import the logging function
 
const searchCars = async (userId, search) => {
  try {
    // Log the search
    const timestamp = new Date().toISOString();
    logSearchAction(userId, search, timestamp);
    // Search in PostgreSQL
    const postgresResult = await getCarsPostgres(search);

    // Search in MongoDB
    const mongoResult = await getCarsMongo(search);

    // Combine the results
    const combinedResult = [...postgresResult, ...mongoResult];

    return combinedResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = {
  searchCars,
};
