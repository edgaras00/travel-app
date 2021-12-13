const express = require("express");
const mongoose = require("mongoose");
const destinationRouter = require("./api/routes/destinationsRouter");
const userRouter = require("./api/routes/userRouter");
const bookingRouter = require("./api/routes/bookingRouter");
const reviewRouter = require("./api/routes/reviewRouter");
const packageRouter = require("./api/routes/packageRouter");
require("dotenv").config();

const app = express();

const DB_CONN = process.env.DB_STRING.replace(
  "<password>",
  process.env.DB_PASSWORD
);

mongoose.connect(DB_CONN, () => {
  console.log("Connected to DB");
});

app.use("/api/destinations", destinationRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/packages", packageRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
