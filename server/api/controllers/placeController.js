const Place = require("../models/placeModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllPlaces = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Place.find(), req.query)
    .filter()
    .limitFields()
    .paginate();

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
  const place = await Place.findById(req.params.placeID);

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

  res.status(200).json({
    status: "Success",
    data: {
      place,
    },
  });
});

exports.deletePlace = catchAsync(async (req, res, next) => {
  await Place.findByIdAndDelete(req.params.placeID);

  res.status(204).json({ status: "Success" });
});
