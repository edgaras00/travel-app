const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Destination = require("../api/models/destinationModel");
const Tour = require("../api/models/tourModel");
const Region = require("../api/models/regionModel");
require("dotenv").config({ path: "../.env" });

// Read data
const readData = (path) => JSON.parse(fs.readFileSync(path, "utf-8"));

// Function to connect to the DB
const connectToDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_STRING.replace("<password>", process.env.DB_PASSWORD)
    );
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Function to clear the collection before uploading data
const clearDB = async (Model) => {
  try {
    await Model.deleteMany({});
  } catch (error) {
    console.log(error);
  }
};

const uploadData = async (Model, data) => {
  try {
    await Model.insertMany(data);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Read files
    const destinationData = readData(path.join(__dirname, "destinations.json"));
    const tourData = readData(path.join(__dirname, "tours.json"));
    const regionData = readData(path.join(__dirname, "regions.json"));

    // Connect to DB
    await connectToDB();

    // Clear collections
    await clearDB(Destination);
    await clearDB(Tour);
    // await clearDB(Region);
    console.log("DB cleared");

    // Upload new data to DB
    await uploadData(Destination, destinationData);
    await uploadData(Tour, tourData);
    // await uploadData(Region, regionData);
    console.log("Data imported successfully!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
