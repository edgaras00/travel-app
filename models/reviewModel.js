const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  header: {
    type: String,
    required: [true, "Review must have a header"],
    maxLength: [100, "Review header cannot be longer than 100 characters"],
    trim: true,
  },
  text: {
    type: String,
    required: [true, "Review must have text"],
    maxLength: [4000, "Review cannot be longer than 4000 characters"],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, "Review must have a rating"],
    min: [1, "Review rating cannot be lower than 1.0"],
    max: [5, "Review rating cannot be higher than 5.0"],
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: [true, "Review must reference a tour"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must reference a user"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Query middleware
// Populate user and tour fields with their names
reviewSchema.pre(/^find/, function (next) {
  this.populate("user tour", "name");
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
