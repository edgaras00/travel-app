const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public routes
router.get("/", tourController.getAllTours);
router.get("/:tourID", tourController.getTour);

// Protected and restricted routes
router.use(authController.protectRoute);
router.use(authController.restrictRouteTo("admin"));

router.post("/", tourController.createTour);

router
  .route("/:tourID")
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
