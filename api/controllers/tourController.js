const mongoose = require("mongoose");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllTours = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query.populate("guides name");

  res.status(200).json({
    status: "Success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourID);
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
  const updatedTour = await Tour.findByIdAndUpdate(req.params.tourID, req.body);

  res.status(201).json({
    status: "Success",
    data: {
      tour: updatedTour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.tourID);
  res.status(204).json({
    status: "Success",
    message: "Success",
  });
});
