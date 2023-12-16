// to retrieve cars based on search criteria
const Car = require("/Users/keyinstudent/Desktop/S3FinalSprint/Services/mongo.js");
console.log("Executing m.cars.dal.js");

const getCarsMongo = function (search) {
  const regex = new RegExp(search, "i"); // "i" indicates case-insensitive

  return new Promise(function (resolve, reject) {
    Car.find({
      $or: [
        { make: regex },
        { model: regex },
        { year: regex },
        { colour: regex },
        { mileage: regex },
        { vin: regex },
      ],
    })
      .exec() // Use exec() to execute the query
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

module.exports = {
  getCarsMongo,
};
