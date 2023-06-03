const Place = require("../models/placeModel");
const APIFeatures = require("../../utils/apiFeatures");
const AppError = require("../../utils/appError");

const catchAsync = require("../../utils/catchAsync");
const validateID = require("../../utils/validateID");

exports.getAllPlaces = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Place.find(), req.query)
    .filter()
    .limitFields()
    .paginate();

  // Execute query
  const places = await features.query;

  res.status(200).json({
    status: "Success",
    results: places.length,
    data: {
      places,
    },
  });
});

exports.getPlace = catchAsync(async (req, res, next) => {
  const id = req.params.placeID;

  const place = validateID(id)
    ? await Place.findById(id)
    : await Place.findOne({ slug: id });

  if (!place) {
    return next(new AppError("Place not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      place,
    },
  });
});

exports.createPlace = catchAsync(async (req, res, next) => {
  const place = await Place.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      place,
    },
  });
});

exports.updatePlace = catchAsync(async (req, res, next) => {
  const place = await Place.findByIdAndUpdate(req.params.placeID, req.body);

  if (!place) {
    return next(new AppError("Place not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      place,
    },
  });
});

exports.deletePlace = catchAsync(async (req, res, next) => {
  const place = await Place.findByIdAndDelete(req.params.placeID);

  if (!place) {
    return next(new AppError("Place not found", 404));
  }

  res.status(204).json({ status: "Success" });
});
