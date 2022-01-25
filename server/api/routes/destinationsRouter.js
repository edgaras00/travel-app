const express = require("express");
const destinationController = require("../controllers/destinationController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(destinationController.getAllDestinations)
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    destinationController.createDestination
  );

router
  .route("/:destinationID")
  .get(destinationController.getDestination)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    destinationController.updateDestination
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    destinationController.deleteDestination
  );

module.exports = router;
