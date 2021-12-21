const Booking = require("../models/bookingModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const bookings = await features.query.populate("user tour", "name");

  res.status(200).json({
    status: "Success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingID);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      booking,
    },
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = { ...req.body, user: req.user._id };
  const booking = await Booking.create(newBooking);

  res.status(201).json({
    status: "Success",
    data: {
      booking,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.bookingID,
    req.body,
    { new: true }
  );

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.bookingID);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});