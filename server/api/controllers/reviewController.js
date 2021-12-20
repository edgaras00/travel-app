const Review = require("../models/reviewModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query.populate("tour user", "name");

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

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = { ...req.body, user: req.user._id };
  const review = await Review.create(newReview);

  res.status(201).json({
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
