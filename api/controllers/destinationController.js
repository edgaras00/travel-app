const Destination = require("../models/destinationModel");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllDestinations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .limitFields()
    .paginate();
  const destinations = await features.query;
  res.status(200).json({
    status: "Success",
    results: destinations.length,
    data: {
      destinations,
    },
  });
});

exports.getDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findById(req.params.destinationID);

  res.status(200).json({
    status: "Success",
    data: {
      destination,
    },
  });
});

exports.createDestination = catchAsync(async (req, res, next) => {
  const newDestination = {
    // _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
    ...req.body,
  };
  const destination = await Destination.create(newDestination);

  res.status(201).json({
    status: "Success",
    data: {
      destination,
    },
  });
});

exports.updateDestination = catchAsync(async (req, res, next) => {
  const updatedDestination = await Destination.findByIdAndUpdate(
    req.params.destinationID,
    req.body
  );

  res.status(200).json({
    status: "Success",
    data: {
      updatedDestination,
    },
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  await Destination.findByIdAndDelete(req.params.destinationID);
  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});
