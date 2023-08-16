const express = require("express");
// const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");

// Routers
const destinationRouter = require("./api/routes/destinationsRouter");
const regionRouter = require("./api/routes/regionRouter");
const userRouter = require("./api/routes/userRouter");
const bookingRouter = require("./api/routes/bookingRouter");
const reviewRouter = require("./api/routes/reviewRouter");
const tourRouter = require("./api/routes/tourRouter");
const placeRouter = require("./api/routes/placeRouter");
const customOrderRouter = require("./api/routes/customOrderRouter");
const errorHandler = require("./api/controllers/errorController");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/destinations", destinationRouter);
app.use("/api/regions", regionRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/tours", tourRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/places", placeRouter);
app.use("/api/custom", customOrderRouter);
app.use("/", (req, res) => res.status(200).send("Welcome"));

// Handle not defined routes | 404
app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} is not found`, 404));
});

// Global error middleware
app.use(errorHandler);

module.exports = app;
