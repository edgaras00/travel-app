const mongoose = require("mongoose");
const { isEmail } = require("validator");

const customOrderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Custom order must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Custom order must have a last name"],
  },
  phone: {
    type: Number,
    required: [true, "Custom order must have a phone number"],
  },
  email: {
    type: String,
    required: [true, "Custom order must have an email"],
    validate: [isEmail, "Invalid email"],
  },
  destination: String,
  travelingWithin: String,
  numberOfTravelers: Number,
  comments: {
    type: String,
    maxLength: 5000,
  },
  travelInterests: [String],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
module.exports = CustomOrder;
