const logSearch = require("./logging/logging");

// function that combines postgres and mongo queries to search for cars
const searchCars = async (userID, search) => {
  try {
    const timestamp = new Date().toISOString();

    logSearch(userID, search, timestamp);

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
