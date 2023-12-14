const mongoose = require("mongoose");

// schema for mongoDB
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  colour: String,
  mileage: Number,
  vin: String,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
