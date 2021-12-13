const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema({
  _id: Schema.Types.ObjectId,
  header: {
    type: String,
    required: [true, "Review must have a header"],
    maxLength: [100, "Review header cannot be longer than 100 characters"],
  },
  text: {
    type: String,
    required: [true, "Review must have text"],
    minLength: [50, "Review text has to be at least 50 characters long"],
    maxLength: [4000, "Review cannot be longer than 4000 characters"],
  },
  rating: {
    type: String,
    required: [true, "Review must have a rating"],
    min: [1, "Review rating cannot be lower than 1.0"],
    max: [5, "Review rating cannot be higher than 5.0"],
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: "Package",
    required: [true, "Review must reference a package"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Review must reference a user"],
  },
});

const Review = mongoose.Model(reviewSchema, "Review");
module.exports = Review;
