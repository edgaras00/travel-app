const express = require("express");
const authController = require("../controllers/authController");
const regionController = require("../controllers/regionController");
const router = express.Router();

// Public routes
router.get("/", regionController.getAllRegions);
router.get("/:regionID", regionController.getRegion);

// Protected and restricted routes
router.use(authController.protectRoute);
router.use(authController.restrictRouteTo("admin"));

router.post("/", regionController.createRegion);

router
  .route("/:regionID")
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
