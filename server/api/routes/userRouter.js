const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

// Authorization
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Protect all routes after this middleware
router.use(authController.protectRoute);
router.use(authController.restrictRouteTo("admin"));

router.get(
  "/",
  authController.protectRoute,
  authController.restrictRouteTo("admin"),
  userController.getAllUsers
);

router
  .route("/:userID")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
