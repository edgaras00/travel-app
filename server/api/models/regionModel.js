const mongoose = require("mongoose");
const slugify = require("slugify");

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A region must have a name"],
    unique: [true, "Region name has to be unique"],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, "A region must have a description"],
  },
  regionAtGlance: String,
  regionCoordinates: [String],
  destinationCoordinates: [{ name: String, coordinates: [String] }],
  coverImage: {
    type: String,
    required: [true, "A region must have a cover image"],
  },
});

// Slugify region name
regionSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Region = mongoose.model("Region", regionSchema);
module.exports = Region;
