const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.post("/book/", authController.protectRoute, bookingController.bookTour);

router
  .route("/")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    bookingController.getAllBookings
  )
  .post(authController.protectRoute, bookingController.createBooking);

router.get(
  "/user",
  authController.protectRoute,
  bookingController.getUserBookings
);

router
  .route("/:bookingID")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
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
