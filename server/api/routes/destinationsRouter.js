const express = require("express");
const destinationController = require("../controllers/destinationController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public routes
router.get("/", destinationController.getAllDestinations);
router.get("/:destinationID", destinationController.getDestination);

// Protect and restrict routes middleware
router.use(authController.protectRoute);
router.use(authController.restrictRouteTo("admin"));

router.post("/", destinationController.createDestination);

router
  .route("/:destinationID")
  .patch(destinationController.updateDestination)
  .delete(destinationController.deleteDestination);

module.exports = router;
