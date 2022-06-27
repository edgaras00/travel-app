const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  name: {
    type: String,
    required: [true, "Destination must have a name"],
    unique: [true, "Destination name has to be unique"],
    maxLength: [70, "Destination name cannot be longer than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Destination must have a description"],
  },
  weather: String,
  bestTimeToVisit: String,
  currency: String,
  language: String,
  region: {
    type: "String",
    required: [true, "Destination must have a region"],
    enum: [
      "USA",
      "Europe",
      "Asia",
      "Oceania",
      "Africa",
      "Caribbean",
      "Indian Ocean",
      "Central America",
      "South America",
      "North America",
      "Middle East",
      "Antarctica",
    ],
  },
  thingsToDo: [{ name: String, text: String }],
  places: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  coverImage: {
    type: String,
    required: [true, "Destination must have a cover image"],
  },
  tours: [{ type: Schema.Types.ObjectId, ref: "Tour" }],
});

destinationSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
