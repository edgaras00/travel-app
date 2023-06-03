const mongoose = require("mongoose");
const slugify = require("slugify");
const Review = require("./reviewModel");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Review name has to be unique"],
      required: [true, "Tour must have a name"],
      minLength: [10, "Tour name must be at least 10 characters long"],
      maxLength: [100, "Tour name cannot be longer than 50 characters"],
      trim: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, "Tour must have a price"],
    },
    description: {
      type: String,
      required: [true, "Tour must have a description"],
    },
    duration: {
      type: Number,
      required: [true, "Tour must have a duration (days)"],
    },
    averageRating: {
      type: Number,
      default: 4,
      min: [1, "Rating cannot be lower than 1.0"],
      max: [5, "rating cannot be higher than 5.0"],
    },
    numberOfRatings: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      enum: [
        "adventure",
        "general",
        "group",
        "culture",
        "family",
        "romantic",
        "safari",
        "wildlife",
        "city",
      ],
    },
    coverImage: {
      type: String,
      required: [true, "Tour must have a cover image"],
    },
    images: [String],
    itineraryDescription: String,
    itineraries: {},
    locations: [{ name: String, coordinates: [String] }],
    region: {
      type: String,
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
  },
  // Include virtual properties in the output (both JSON and Object)
  // Virtual properties are not stored in DB but are defined in the schema
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Slugify tour name
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Define virtual review property
tourSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tour",
});

tourSchema.methods.calculateAverageRating = async function () {
  const reviews = await Review.find({ tour: this._id });

  // If all reviews deleted
  if (reviews.length === 0) {
    this.averageRating = 4;
    this.numberOfRatings = 0;
    this.save();
    return;
  }

  // Calculate average
  const ratingSum = reviews
    .map((review) => review.rating)
    .reduce((prev, current) => prev + current);
  const average = parseFloat((ratingSum / reviews.length).toFixed(2));
  this.averageRating = average;
  this.numberOfRatings = reviews.length;
  this.save();
  return;
};

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
