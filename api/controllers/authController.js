exports.signup = (req, res, next) => {
  const newUser = {};
  const token = "";
  res.status(201).json({
    status: "Success",
    token,
    data: {
      newUser,
    },
  });
};

exports.login = (req, res, next) => {
  const user = {};
  const token = "";
  res.status(200).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
};

exports.protectRoute = (req, res, next) => {
  // Get token
  const token = "";

  // Verify token

  // Check for user

  next();
};
