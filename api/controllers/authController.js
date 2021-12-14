const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
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

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Check for user
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (
      !user ||
      !(await user.comparePasswords(req.body.password, user.password))
    ) {
      throw new Error("Incorrect email or password");
    }

    // Hide password
    user.password = undefined;

    const token = await signToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.protectRoute = (req, res, next) => {
  // Get token
  const token = "";

  // Verify token

  // Check for user

  next();
};
