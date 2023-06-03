const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

// Protected and restricted routes
router.use(authController.protectRoute);

// Only users can post tour reviews
router
  .route("/")
  .get(authController.restrictRouteTo("admin"), reviewController.getAllReviews)
  .post(authController.restrictRouteTo("user"), reviewController.submitReview);

router
  .route("/:reviewID")
  .get(authController.restrictRouteTo("admin"), reviewController.getReview)
  .patch(authController.restrictRouteTo("admin"), reviewController.updateReview)
  .delete(
    authController.restrictRouteTo("admin"),
    reviewController.deleteReview
  );

router.patch("/update/:reviewID", reviewController.userUpdateReview);

router.delete("/remove/:reviewID", reviewController.userDeleteReview);

module.exports = router;
