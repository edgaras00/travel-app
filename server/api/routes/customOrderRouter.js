const express = require("express");
const customOrderController = require("../controllers/customOrderController");

const router = express.Router();

router
  .route("/")
  .get(customOrderController.getAllCustomrOrders)
  .post(customOrderController.createCustomOrder);

router
  .route("/:customOrderID")
  .get(customOrderController.createCustomOrder)
  .patch(customOrderController.updateCustomOrder)
  .delete(customOrderController.deleteCustomOrder);

module.exports = router;
