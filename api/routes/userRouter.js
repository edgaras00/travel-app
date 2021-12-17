const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

// router.patch(
//   "/add_to_cart",
//   authController.protectRoute,
//   userController.addToCart
// );

// router.patch(
//   "/remove_from_cart",
//   authController.protectRoute,
//   userController.removeFromCart
// );

// router.patch(
//   "/clear_cart",
//   authController.protectRoute,
//   userController.clearCart
// );

router.patch("/cart", authController.protectRoute, userController.modifyCart);

router.get("/", userController.getAllUsers);

router
  .route("/:userID")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
