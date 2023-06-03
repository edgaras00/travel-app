const express = require("express");
const authController = require("../controllers/authController");
const customOrderController = require("../controllers/customOrderController");

const router = express.Router();

// Protect all routes middleware
router.use(authController.protectRoute);

router.post("/", customOrderController.createCustomOrder);

// Restrict routes to "admin"
router.use(authController.restrictRouteTo("admin"));

router.get("/", customOrderController.getAllCustomOrders);

router
  .route("/:customOrderID")
  .get(customOrderController.getCustomOrder)
  .patch(customOrderController.updateCustomOrder)
  .delete(customOrderController.deleteCustomOrder);

module.exports = router;
