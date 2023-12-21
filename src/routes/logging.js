// Funtion to log search queries
const fs = require("fs");
const path = require("path");

const logSearch = (name, searchTerm, timestamp, callback) => {
  const logNote = `User: ${name} searched for ${searchTerm} at ${timestamp}\n`;

  // path to the log file
  const logPath = path.join(__dirname, "searchLog.txt");

  fs.appendFile(logPath, logNote, (error) => {
    if (error) {
      console.error(`Error writing to log file:`, error);
    } else {
      console.log("Log note written successfully");
    }

    // Call the callback function to indicate completion
    callback();
  });
};
module.exports = logSearch;
