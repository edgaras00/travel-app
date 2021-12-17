const Booking = require("../models/bookingModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllBookings = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingID);

    res.status(200).json({
      status: "Success",
      data: {
        booking,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = { ...req.body, user: req.user._id };
    const booking = await Booking.create(newBooking);

    res.status(201).json({
      status: "Success",
      data: {
        booking,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingID,
      req.body
    );

    res.status(200).json({
      status: "Success",
      data: {
        booking,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookingID);

    res.status(204).json({
      status: "Success",
      message: "Successful deletion",
    });
  } catch (error) {
    console.log(error);
  }
};
