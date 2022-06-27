const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    reviewController.getAllReviews
  )
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("user"),
    reviewController.submitReview
  );

router
  .route("/:reviewID")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    reviewController.getReview
  )
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    reviewController.updateReview
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    reviewController.deleteReview
  );

router.patch(
  "/update/:reviewID",
  authController.protectRoute,
  reviewController.userUpdateReview
);

router.delete(
  "/remove/:reviewID",
  authController.protectRoute,
  reviewController.userDeleteReview
);

module.exports = router;
