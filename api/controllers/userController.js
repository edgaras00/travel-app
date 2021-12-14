const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "Success",
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userID);
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userID);
    res.status(204).json({
      status: "Success",
      message: "Successful deletion",
    });
  } catch (error) {
    console.log(error);
  }
};
