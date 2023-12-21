// function that combines postgres and mongo queries to search for cars and logs the search parameters 
// Import the logging function
import logSearchAction from logging.js
//  const fs=require('fs');
//  const path = require('path');
//  const logSearchAction = (search, timestamp, username) => {
//   const log = `${timestamp} - User name: ${username}, Search: ${search}\n`;
//   console.log('Logging search:', log);
//   const filePath = path.join(__dirname, '../../src/routes/searchLog.txt');
//   fs.appendFile(filePath, log, (error) => {
//     if (error) {
//       console.error('Error writing to searchLog.txt:', error);
//     }
//   });
// };

const searchCars = async (username, search) => {
  try {
    // Log the search
    const timestamp = new Date().toISOString();
    logSearchAction(search, timestamp, username);
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
