// to retreieve cars based on search criteria
const Car = require("../Models/car");

const getCarsMongo = function (search) {
  const regex = new RegExp(search, "i"); // "i" indicates case-insensitive

  return new Promise(function (resolve, reject) {
    Car.find(
      {
        $or: [
          { make: regex },
          { model: regex },
          { year: regex },
          { colour: regex },
          { mileage: regex },
          { vin: regex },
        ],
      },
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getCarsMongo,
};
