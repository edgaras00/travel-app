const mongoose = require("mongoose");
const slugify = require("slugify");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Place name has to be unique"],
    required: [true, "A place must have a name"],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, "A place must have a description"],
  },
  coverImage: {
    type: String,
    required: [true, "A place must have a cover image"],
  },
  coordinates: [String],
  thingsToDo: [{ name: String, text: String }],
});

// Slugify place name
placeSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
