const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Sprint", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// schema for mongoDB
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: String,
  colour: String,
  mileage: String,
  vin: String,
});

const Car = mongoose.model("Car", carSchema);

const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoDB.once("open", () => {
  console.log("MongoDB connected");
});

module.exports = Car;
