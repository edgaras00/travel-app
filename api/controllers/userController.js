exports.getAllUsers = (req, res, next) => {
  const users = [];

  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
};

exports.getUser = (req, res, next) => {
  const user = req.params.userID;

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res, next) => {
  const user = req.params.userID;

  res.status(200).json({
    status: "Success",
    data: {
      user,
    },
  });
};

exports.deleteUser = (req, res, next) => {
  const user = req.params.userID;

  res.status(204).json({
    status: "Success",
    message: "Successful deletion",
  });
};
