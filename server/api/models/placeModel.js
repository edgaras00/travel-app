const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
