const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regionSchema = new Schema({
  name: {
    type: String,
    required: [true, "A region must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A region must have a description"],
  },
  regionAtGlance: {
    type: String,
  },
  regionCoordinates: [String],
  destinationCoordinates: [{ name: String, coordinates: [String] }],
  coverImage: {
    type: String,
    required: [true, "A region must have a cover image"],
  },
  images: [String],
});

const Region = mongoose.model("Region", regionSchema);
module.exports = Region;
