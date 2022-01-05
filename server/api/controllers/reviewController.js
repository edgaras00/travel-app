const Review = require("../models/reviewModel");
const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.submitReview = catchAsync(async (req, res, next) => {
  const { tour, user } = req.body;

  // Check if booking exists
  const booking = await Booking.find({ user, tour });
  if (booking.length === 0) {
    return next(new AppError("No tour purchased by the user found", 400));
  }

  // Check if the user has already reviewed this tour
  const prevReview = await Review.findOne({ tour, user });
  if (prevReview) {
    return next(
      new AppError(
        "User has already reviewed this tour. Use PATCH to update a review",
        400
      )
    );
  }

  // Create review
  const review = await Review.create(req.body);

  // Recalculate tour average rating
  let tourDoc = await Tour.findById(tour);
  await tourDoc.calculateAverage();

  res.status(201).json({
    status: "Success",
    data: {
      review,
    },
  });
});

exports.userUpdateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.reviewID, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!review) {
    return next(new AppError("Review does not belong to user", 400));
  }

  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.reviewID);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.reviewID, req.body, {
    new: true,
  });

  if (!review) {
    return next(new AppError("Review not found"));
  }

  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.reviewID);

  if (!review) {
    return next(new AppError("Review not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});
