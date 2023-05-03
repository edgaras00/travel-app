const express = require("express");
const bookingController = require("../controllers/bookingController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

// Protect all routes middleware
router.use(authController.protectRoute);

router.post("/book/", bookingController.bookTour);

router.get("/user", bookingController.getUserBookings);

// Restrict routes to "admin" after this middleware
authController.restrictRouteTo("admin");

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route("/:bookingID")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
