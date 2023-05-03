const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

// Authorization
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get(
  "/",
  authController.protectRoute,
  authController.restrictRouteTo("admin"),
  userController.getAllUsers
);

router
  .route("/:userID")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.deleteUser
  );

module.exports = router;
