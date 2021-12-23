const Destination = require("../models/destinationModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllDestinations = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Destination.find(), req.query)
    .filter()
    .limitFields()
    .paginate();
  const destinations = await features.query.populate("region", "name");
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

  if (!destination) {
    return next(new AppError("Destination not found", 404));
  }

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
  const destination = await Destination.findByIdAndUpdate(
    req.params.destinationID,
    req.body,
    { new: true }
  );

  if (!destination) {
    return next(new AppError("Destination not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      destination,
    },
  });
});

exports.deleteDestination = catchAsync(async (req, res, next) => {
  const destination = await Destination.findByIdAndDelete(
    req.params.destinationID
  );

  if (!destination) {
    return next(new AppError("Destination not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});
