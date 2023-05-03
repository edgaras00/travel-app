const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const validateID = require("../utils/validateID");

exports.getAllTours = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Execute query
  const tours = await features.query;

  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const id = req.params.tourID;
  // Find by slug or ID
  const tour = validateID(id)
    ? await Tour.findById(req.params.tourID).populate(
        "reviews",
        "name header text rating date -tour"
      )
    : await Tour.findOne({ slug: id }).populate(
        // "reviews",
        // "name header text rating date -tour",
        {
          path: "reviews",
          select: "name header text rating date -tour",
          options: { sort: { date: -1 } },
        }
      );

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = {
    ...req.body,
  };

  const tour = await Tour.create(newTour);

  res.status(201).json({
    status: "Success",
    data: {
      tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.tourID, req.body, {
    new: true,
  });

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      tour: tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.tourID);

  if (!tour) {
    return next(new AppError("Tour not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Success",
  });
});
