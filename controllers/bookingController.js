const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Booking = require("../models/bookingModel");

const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  // Build qeury
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // Execute query
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

exports.bookTour = catchAsync(async (req, res, next) => {
  const { id, amount, tourID, description } = req.body;
  const userID = req.user._id;

  // Create a new paymentIntent object
  const payment = await stripe.paymentIntents.create({
    amount,
    currency: "USD",
    description,
    payment_method: id,
    confirm: true,
  });
  let booking;
  if (payment.status === "succeeded") {
    booking = await Booking.create({
      price: payment.amount,
      date: new Date(payment.created * 1000),
      user: userID,
      tour: tourID,
    });
  }

  res.status(201).json({
    status: "Success",
    message: "Payment successful!",
    data: {
      booking,
    },
  });
});

exports.getUserBookings = catchAsync(async (req, res, next) => {
  const userID = req.user._id;

  const bookings = await Booking.find({ user: userID }).populate(
    "tour",
    "name coverImage price slug"
  );

  res.status(200).json({
    status: "Success",
    data: {
      bookings,
    },
  });
});
