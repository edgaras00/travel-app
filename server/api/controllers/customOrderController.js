const CustomOrder = require("../models/customOrderModel");

const APIFeatures = require("../../utils/apiFeatures");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllCustomOrders = catchAsync(async (req, res, next) => {
  // Build query
  const features = new APIFeatures(CustomOrder.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Execute query
  const customOrders = await features.query;

  res.status(200).json({
    status: "Success",
    data: {
      customOrders,
    },
  });
});

exports.getCustomOrder = catchAsync(async (req, res, next) => {
  const customOrder = await CustomOrder.findById(req.params.customOrderID);

  if (!customOrder) {
    return next(new AppError("Custom order not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      customOrder,
    },
  });
});

exports.createCustomOrder = catchAsync(async (req, res, next) => {
  const customOrder = await CustomOrder.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      customOrder,
    },
  });
});

exports.updateCustomOrder = catchAsync(async (req, res, next) => {
  const customOrder = await CustomOrder.findByIdAndUpdate(
    req.params.customOrderID,
    req.body,
    { new: true }
  );

  if (!customOrder) {
    return next(new AppError("Custom order not found", 404));
  }

  res.status(200).json({
    data: "Success",
    data: {
      customOrder,
    },
  });
});

exports.deleteCustomOrder = catchAsync(async (req, res, next) => {
  const customOrder = await CustomOrder.findByIdAndDelete(
    req.params.customOrderID
  );

  if (!customOrder) {
    return next(new AppError("Custom order not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});
