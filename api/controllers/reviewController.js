exports.getAllReviews = (req, res, next) => {
  const reviews = [];

  res.status(200).json({
    status: "Success",
    data: {
      reviews,
    },
  });
};

exports.getReview = (req, res, next) => {
  const review = req.params.reviewID;

  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
};

exports.createReview = (req, res, next) => {
  const newReview = {};

  res.status(201).json({
    status: "Success",
    data: {
      newReview,
    },
  });
};

exports.updateReview = (req, res, next) => {
  const review = req.params.reviewID;

  res.status(200).json({
    status: "Success",
    data: {
      review,
    },
  });
};

exports.deleteReview = (req, res, next) => {
  const review = req.params.reviewID;

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
};
