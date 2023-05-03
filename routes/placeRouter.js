const express = require("express");
const authController = require("../controllers/authController");
const placeController = require("../controllers/placeController");
const router = express.Router();

// Public routes
router.get("/", placeController.getAllPlaces);
router.get("/:placeID", placeController.getPlace);

// Protected and restricted routes
router.use(authController.protectRoute);
router.use(authController.restrictRouteTo("admin"));

router.post("/", placeController.createPlace);

router
  .route("/:placeID")
  .patch(placeController.updatePlace)
  .delete(placeController.deletePlace);

module.exports = router;
