const Review = require("../models/reviewModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllReviews = async (req, res, next) => {
  try {
    const features = new APIFeatures(Review.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .populate("tour user", "name");
    const reviews = await features.query;

    res.status(200).json({
      status: "Success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewID);

    res.status(200).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const newReview = { ...req.body, user: req.user._id };
    const review = await Review.create(newReview);

    res.status(201).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewID,
      req.body
    );

    res.status(200).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    await Review.findByIdAndDelete(req.params.reviewID);

    res.status(204).json({
      status: "Success",
      message: "Successful deletion",
    });
  } catch (error) {
    console.log(error);
  }
};
