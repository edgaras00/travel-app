const express = require("express");
const cookieParser = require("cookie-parser");
const destinationRouter = require("./api/routes/destinationsRouter");
const userRouter = require("./api/routes/userRouter");
const bookingRouter = require("./api/routes/bookingRouter");
const reviewRouter = require("./api/routes/reviewRouter");
const tourRouter = require("./api/routes/tourRouter");

const app = express();

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/destinations", destinationRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/tours", tourRouter);
app.use("/api/bookings", bookingRouter);

module.exports = app;
