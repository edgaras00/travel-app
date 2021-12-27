const express = require("express");
const placeController = require("../controllers/placeController");
const router = express.Router();

router
  .route("/")
  .get(placeController.getAllPlaces)
  .post(placeController.createPlace);

router
  .route("/:placeID")
  .get(placeController.getPlace)
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

module.exports = router;
