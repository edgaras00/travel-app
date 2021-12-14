const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, "Destination must have a name"],
    unique: true,
    maxLength: [50, "Destination name cannot be longer than 50 characters"],
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
      thingsToDo: [{ title: String, text: String }],
    },
  ],
  coverImage: {
    type: String,
    required: [true, "Destination must have a cover image"],
  },
  packages: [{ type: Schema.Types.ObjectId, ref: "Package" }],
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
