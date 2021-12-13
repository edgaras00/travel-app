const express = require("express");
const packageController = require("../controllers/packageController");

const router = express.Router();

router
  .route("/")
  .get(packageController.getAllPackages)
  .post(packageController.createPackage);

router
  .route("/:packageID")
  .get(packageController.getPackage)
  .patch(packageController.updatePackage)
  .delete(packageController.deletePackage);

module.exports = router;
