const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const User = require("../models/userModel");

// Function to create a token
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createAndSendToken = (user, statusCode, res) => {
  // Function that creates a token and sends it as a cookie to client

  const token = signToken(user.id);

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };
  // Make it secure only in production
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Send JWT as a cookie
  res.cookie("jwt", token, cookieOptions);

  // Send response
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Sign up a new user
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(newUser);
  // Hide password in output
  user.password = undefined;

  const token = signToken(user._id);

  // User object that gets sent to the client
  const userObject = { name: user.name, email: user.email, id: user._id };

  // Send JWT as a cookie
  createAndSendToken(userObject, 201, res);
});

// Sign in user
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

  // User object that gets sent to client
  const userObject = { name: user.name, email: user.email, id: user._id };

  createAndSendToken(userObject, 200, res);
});

// Protect route
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

// Log out user
exports.logout = catchAsync(async (req, res, next) => {
  // Log out user
  // "Delete" JWT cookie
  res.cookie("jwt", "", { maxAge: 1 });
  res
    .status(200)
    .json({ status: "Success", message: "User logged out successfully" });
});

// Route restriction
exports.restrictRouteTo = (...userRoles) => {
  return (req, res, next) => {
    // userRoles = ["admin", "user"]
    if (!userRoles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 401)
      );
    }
    next();
  };
};
