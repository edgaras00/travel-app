const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Destination must have a name"],
    unique: true,
    maxLength: [50, "Package name cannot be longer than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Destination must have a description"],
  },
  weather: String,
  currency: String,
  language: String,
  thingsToDo: [{ title: String, text: String }],
  places: [
    {
      name: String,
      description: String,
      thingsToDo: String,
    },
  ],
  coverImage: {
    type: String,
    required: [true, "Destination must have a cover image"],
  },
  packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
});

const Destination = mongoose.Model(destinationSchema, "Destination");
module.exports = Destination;
