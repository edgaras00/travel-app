const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");

const customOrderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Custom order must have a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Custom order must have a last name"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Custom order must have a phone number"],
    validate: [isMobilePhone, "Invalid phone number"],
  },
  email: {
    type: String,
    required: [true, "Custom order must have an email"],
    validate: [isEmail, "Invalid email"],
    trim: true,
  },
  destination: {
    type: String,
    trim: true,
  },
  travelingWithin: String,
  numberOfTravelers: Number,
  comments: {
    type: String,
    maxLength: 5000,
    trim: true,
  },
  travelInterests: [String],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
module.exports = CustomOrder;
