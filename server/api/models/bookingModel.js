const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must reference a user"],
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: [true, "Booking must reference a tour"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
