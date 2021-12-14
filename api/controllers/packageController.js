const mongoose = require("mongoose");
const Package = require("../models/packageModel");

exports.getAllPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      status: "Success",
      data: {
        packages,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getPackage = async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.packageID);
    res.status(200).json({
      status: "Success",
      data: {
        package: {},
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createPackage = async (req, res, next) => {
  try {
    const newPackage = {
      _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
      ...req.body,
    };

    const package = await Package.create(newPackage);

    res.status(201).json({
      status: "Success",
      data: {
        package,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePackage = async (req, res, next) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        package: updatedPackage,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePackage = async (req, res, next) => {
  try {
    await Package.findByIdAndDelete(req.params.packageID);
    res.status(204).json({
      status: "Success",
      message: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};
