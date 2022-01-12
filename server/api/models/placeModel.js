const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const placeSchema = new Schema({
  name: {
    type: String,
    required: [true, "A place must have a name"],
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

placeSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
