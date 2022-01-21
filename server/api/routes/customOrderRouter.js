const express = require("express");
const customOrderController = require("../controllers/customOrderController");

const router = express.Router();

router
  .route("/")
  .get(customOrderController.getAllCustomOrders)
  .post(customOrderController.createCustomOrder);

router
  .route("/:customOrderID")
  .get(customOrderController.getCustomOrder)
  .patch(customOrderController.updateCustomOrder)
  .delete(customOrderController.deleteCustomOrder);

module.exports = router;
