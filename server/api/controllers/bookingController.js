const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const Booking = require("../models/bookingModel");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.bookTour = catchAsync(async (req, res, next) => {
  // const { product, token } = req.body;
  const { id, amount, email } = req.body;

  const payment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "USD",
    description: "Description",
    payment_method: id,
    confirm: true,
  });
  let booking;
  if (payment.status === "succeeded") {
    booking = await Booking.create({
      price: payment.amount,
      date: new Date(payment.created * 1000),
      user: "61d39664d3826351c66e4591",
      tour: "61c8e9f13aaa1270d0d2c2bf",
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
