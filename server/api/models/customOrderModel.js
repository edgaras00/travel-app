const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;

const customOrderSchema = new Schema({
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
    maxLength: [10, "Phone number cannot be longer than 10 digits."],
  },
  email: {
    type: String,
    required: [true, "Custom order must have an email"],
    validate: [isEmail, "Invalid email"],
  },
  destination: String,
  travelingWithin: String,
  numberOfTravelers: Number,
  comments: String,
  travelInterests: [String],
});

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
module.exports = CustomOrder;
