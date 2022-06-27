const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const destinationRouter = require("./routes/destinationsRouter");
const regionRouter = require("./routes/regionRouter");
const userRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");
const reviewRouter = require("./routes/reviewRouter");
const tourRouter = require("./routes/tourRouter");
const placeRouter = require("./routes/placeRouter");
const customOrderRouter = require("./routes/customOrderRouter");
const AppError = require("./utils/appError");
const errorHandler = require("./controllers/errorController");

const app = express();
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/destinations", destinationRouter);
app.use("/api/regions", regionRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/tours", tourRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/places", placeRouter);
app.use("/api/custom", customOrderRouter);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} is not found`, 404));
});

app.use(errorHandler);

module.exports = app;
