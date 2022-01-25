const express = require("express");
const authController = require("../controllers/authController");
const regionController = require("../controllers/regionController");
const router = express.Router();

router
  .route("/")
  .get(regionController.getAllRegions)
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    regionController.createRegion
  );

router
  .route("/:regionID")
  .get(regionController.getRegion)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    regionController.updateRegion
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    regionController.deleteRegion
  );

module.exports = router;
