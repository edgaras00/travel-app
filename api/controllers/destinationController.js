exports.getAllDestinations = (req, res, next) => {
  const destinations = [];
  res.status(200).json({
    status: "Success",
    data: {
      destinations,
    },
  });
};

exports.getDestination = (req, res, next) => {
  const destination = req.params.destinationID;
  res.status(200).json({
    status: "Success",
    data: {
      destination,
    },
  });
};

exports.createDestination = (req, res, next) => {
  const newDestination = {};
  res.status(201).json({
    status: "Success",
    data: {
      newDestination,
    },
  });
};

exports.updateDestination = (req, res, next) => {
  const updatedDestination = req.params.destinationID;
  res.status(200).json({
    status: "Success",
    data: {
      updatedDestination,
    },
  });
};

exports.deleteDestination = (req, res, next) => {
  const deletedDestination = req.params.destinationID;
  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
};
