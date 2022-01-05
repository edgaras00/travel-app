const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(
    // authController.protectRoute,
    // authController.restrictRouteTo("admin", "guide"),
    reviewController.getAllReviews
  )
  .post(reviewController.submitReview);
// .post(
//   authController.protectRoute,
//   authController.restrictRouteTo("user"),
//   reviewController.createReview
// );

router.patch(
  "/update/:reviewID",
  authController.protectRoute,
  reviewController.userUpdateReview
);

router
  .route("/:reviewID")
  .get(reviewController.getReview)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "user"),
    reviewController.updateReview
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin", "user"),
    reviewController.deleteReview
  );

module.exports = router;
