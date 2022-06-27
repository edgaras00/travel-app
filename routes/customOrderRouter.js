const express = require("express");
const authController = require("../controllers/authController");
const customOrderController = require("../controllers/customOrderController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    customOrderController.getAllCustomOrders
  )
  .post(customOrderController.createCustomOrder);

router
  .route("/:customOrderID")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    customOrderController.getCustomOrder
  )
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    customOrderController.updateCustomOrder
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    customOrderController.deleteCustomOrder
  );

module.exports = router;
