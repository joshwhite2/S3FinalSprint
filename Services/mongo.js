const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/finalSprint.cars", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoDB.once("open", () => {
  console.log("MongoDB connected");
});
