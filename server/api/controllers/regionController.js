const Region = require("../models/regionModel");

const APIFeatures = require("../../utils/apiFeatures");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const validateID = require("../../utils/validateID");

exports.getAllRegions = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(Region.find(), req.query)
    .filter()
    .limitFields()
    .paginate();

  // Execute Query
  const regions = await features.query;

  res.status(200).json({
    status: "Success",
    results: regions.length,
    data: {
      regions,
    },
  });
});

exports.getRegion = catchAsync(async (req, res, next) => {
  const id = req.params.regionID;

  const region = validateID(id)
    ? await Region.findById(id)
    : await Region.findOne({ slug: id });

  if (!region) {
    return next(new AppError("Region not found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      region,
    },
  });
});

exports.createRegion = catchAsync(async (req, res, next) => {
  const newRegion = {
    ...req.body,
  };
  const region = await Region.create(newRegion);

  res.status(201).json({
    status: "Success",
    data: {
      region,
    },
  });
});

exports.updateRegion = catchAsync(async (req, res, next) => {
  const region = await Region.findByIdAndUpdate(req.params.regionID, req.body, {
    new: true,
  });

  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      region,
    },
  });
});

exports.deleteRegion = catchAsync(async (req, res, next) => {
  const region = await Region.findByIdAndDelete(req.params.regionID);

  if (!region) {
    return next(new AppError("Region not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});
