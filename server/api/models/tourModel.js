const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;
const Review = require("./reviewModel");

const tourSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: {
      type: String,
      unique: true,
      required: [true, "Tour must have a name"],
      minLength: [10, "Tour name must be at least 10 characters long"],
      maxLength: [50, "Tour name cannot be longer than 50 characters"],
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
    groupSize: Number,
    coverImage: {
      type: String,
      required: [true, "Tour must have a cover image"],
    },
    images: [String],
    itineraryDescription: String,
    itineraries: {},
    specialNotes: {},
    locations: [{ name: String, coordinates: [String] }],
    guides: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.pre(/^find/, function (next) {
  this.populate("guides");
  next();
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tour",
});

tourSchema.methods.calculateAverage = async function () {
  const reviews = await Review.find({ tour: this._id });
  const ratingSum = reviews
    .map((review) => review.rating)
    .reduce((prev, current) => prev + current);
  const average = parseFloat((ratingSum / reviews.length).toFixed(2));
  this.averageRating = average;
  this.numberOfRatings = reviews.length;
  this.save();
};

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
