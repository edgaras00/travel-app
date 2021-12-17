const express = require("express");
const cookieParser = require("cookie-parser");
const destinationRouter = require("./api/routes/destinationsRouter");
const userRouter = require("./api/routes/userRouter");
const bookingRouter = require("./api/routes/bookingRouter");
const reviewRouter = require("./api/routes/reviewRouter");
const tourRouter = require("./api/routes/tourRouter");
const AppError = require("./api/utils/appError");
const errorHandler = require("./api/controllers/errorController");

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/destinations", destinationRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/tours", tourRouter);
app.use("/api/bookings", bookingRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} is not found`, 404));
});

app.use(errorHandler);

module.exports = app;
