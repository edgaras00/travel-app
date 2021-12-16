const mongoose = require("mongoose");
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTours = async (req, res, next) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate("guides name");
    const tours = await features.query;

    res.status(200).json({
      status: "Success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.tourID);
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour = {
      // _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
      ...req.body,
    };

    const tour = await Tour.create(newTour);

    res.status(201).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.tourID,
      req.body
    );

    res.status(201).json({
      status: "Success",
      data: {
        tour: updatedTour,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.tourID);
    res.status(204).json({
      status: "Success",
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
