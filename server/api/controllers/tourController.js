const mongoose = require("mongoose");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const ObjectId = mongoose.ObjectId;

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query.populate("guides region", "name");

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
  const tour = mongoose.isValidObjectId(id)
    ? await Tour.findById(req.params.tourID)
    : await Tour.findOne({ slug: id });

  // const tour = await Tour.findById(req.params.tourID);

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
    // _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
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

  res.status(201).json({
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
