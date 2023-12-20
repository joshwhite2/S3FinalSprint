// Funtion to log search queries
const fs = require("fs");
const path = require("path");

const logSearch = (name, searchTerm, timestamp) => {
  const logNote = `User: ${name} searched for ${searchTerm} at ${timestamp}\n`;

  // path to the log file
  const logPath = path.join(__dirname, "searchLog.txt");

  fs.appendFile(logPath, logNote, (error) => {
    if (error) {
      console.error(`Error writing to log file:`, error);
    }
  });
};
module.exports = logSearch;
