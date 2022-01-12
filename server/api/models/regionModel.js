const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const regionSchema = new Schema({
  name: {
    type: String,
    required: [true, "A region must have a name"],
    unique: true,
  },
  slug: String,
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

regionSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Region = mongoose.model("Region", regionSchema);
module.exports = Region;
