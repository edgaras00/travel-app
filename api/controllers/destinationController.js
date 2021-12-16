const Destination = require("../models/destinationModel");
const mongoose = require("mongoose");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllDestinations = async (req, res, next) => {
  try {
    const features = new APIFeatures(Destination.find(), req.query)
      .filter()
      .limitFields()
      .paginate();
    const destinations = await features.query;
    // const destinations = await Destination.find();
    res.status(200).json({
      status: "Success",
      results: destinations.length,
      data: {
        destinations,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.destinationID);

    res.status(200).json({
      status: "Success",
      data: {
        destination,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createDestination = async (req, res, next) => {
  try {
    const newDestination = {
      // _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
      ...req.body,
    };
    const destination = await Destination.create(newDestination);

    res.status(201).json({
      status: "Success",
      data: {
        destination,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateDestination = async (req, res, next) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.destinationID,
      req.body
    );

    res.status(200).json({
      status: "Success",
      data: {
        updatedDestination,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDestination = async (req, res, next) => {
  try {
    await Destination.findByIdAndDelete(req.params.destinationID);
    res.status(204).json({
      status: "Success",
      message: "Successful deletion",
    });
  } catch (error) {
    console.log(error);
  }
};
