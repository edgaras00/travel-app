const express = require("express");
const regionController = require("../controllers/regionController");
const router = express.Router();

router
  .route("/")
  .get(regionController.getAllRegions)
  .post(regionController.createRegion);

router
  .route("/:regionID")
  .get(regionController.getRegion)
  .patch(regionController.updateRegion)
  .delete(regionController.deleteRegion);

module.exports = router;
