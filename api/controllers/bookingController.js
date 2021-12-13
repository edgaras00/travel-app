exports.getAllBookings = (req, res, next) => {
  const bookings = [];
  res.status(200).json({
    status: "Success",
    data: {
      bookings,
    },
  });
};

exports.getBooking = (req, res, next) => {
  const booking = req.params.bookingID;
  res.status(200).json({
    status: "Success",
    data: {
      booking,
    },
  });
};

exports.createBooking = (req, res, next) => {
  const newBooking = {};

  res.status(201).json({
    status: "Success",
    data: {
      newBooking,
    },
  });
};

exports.updateBooking = (req, res, next) => {
  const booking = req.params.bookingID;

  res.status(200).json({
    status: "Success",
    data: {
      booking,
    },
  });
};

exports.deleteBooking = (req, res, next) => {
  const booking = req.params.bookingID;

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
};
