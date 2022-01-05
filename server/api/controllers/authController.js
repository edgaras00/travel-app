const { promisify } = require("util");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

const signToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = {
    _id: req.body._id ? req.body._id : mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(newUser);
  // Hide password in output
  user.password = undefined;

  const token = await signToken(user._id);

  const userObject = { name: user.name, email: user.email, cart: user.cart };

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    status: "Success",
    token,
    data: {
      user: userObject,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // Check for user
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (
    !user ||
    !(await user.comparePasswords(req.body.password, user.password))
  ) {
    return next(new AppError("Email or password is incorrect", 401));
  }

  // Hide password
  user.password = undefined;

  const token = await signToken(user._id);

  const userObject = { name: user.name, email: user.email, cart: user.cart };

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: "Success",
    token,
    data: {
      user: userObject,
    },
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  // Check for token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please log in to gain access", 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user with decoded id exists
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError("User who this token belongs to does not exist", 401)
    );
  }
  req.user = user;
  next();
});

exports.restrictRouteTo = (...userRoles) => {
  return catchAsync(async (req, res, next) => {
    if (!userRoles.includes(req.user.role)) {
      return next(new AppError("Not authorized", 401));
    }
    next();
  });
};
