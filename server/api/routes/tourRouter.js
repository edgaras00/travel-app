const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "guide"),
    tourController.createTour
  );

router
  .route("/:packageID")
  .get(tourController.getTour)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "guide"),
    tourController.updateTour
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    tourController.deleteTour
  );

module.exports = router;
