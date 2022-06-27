const express = require("express");
const authController = require("../controllers/authController");
const placeController = require("../controllers/placeController");
const router = express.Router();

router
  .route("/")
  .get(placeController.getAllPlaces)
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    placeController.createPlace
  );

router
  .route("/:placeID")
  .get(placeController.getPlace)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    placeController.updatePlace
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    placeController.deletePlace
  );

module.exports = router;
