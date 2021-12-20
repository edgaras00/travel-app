const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  date: {
    type: Date,
    required: [true, "Booking must have a date"],
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
