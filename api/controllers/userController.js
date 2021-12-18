const mongoose = require("mongoose");
const User = require("../models/userModel");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query.populate("cart", "name price");

  res.status(200).json({
    status: "Success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userID);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.userID, req.body);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.userID);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
});

exports.modifyCart = catchAsync(async (req, res, next) => {
  let user;

  if (req.body.action === "clear") {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { cart: [] } },
      { new: true }
    );
  } else if (req.body.action === "add") {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { cart: req.body.tourID } },
      { new: true }
    );
  } else if (req.body.action === "remove") {
    user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { cart: req.body.tourID } },
      { new: true }
    );
  }

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
});

// exports.addToCart = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $push: { cart: req.body.tourID },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       status: "Success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.removeFromCart = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         $pull: { cart: req.body.tourID },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       status: "Success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.clearCart = async (req, res, next) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { $set: { cart: [] } },
//       { new: true }
//     );

//     res.status(200).json({
//       status: "Success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
