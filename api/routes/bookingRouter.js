const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "guide"),
    bookingController.getAllBookings
  )
  .post(authController.protectRoute, bookingController.createBooking);

router
  .route("/:bookingID")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "guide"),
    bookingController.getBooking
  )
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    bookingController.updateBooking
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    bookingController.deleteBooking
  );

module.exports = router;
