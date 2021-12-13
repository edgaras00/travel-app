exports.getAllPackages = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    data: {
      packages: [],
    },
  });
};

exports.getPackage = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    data: {
      package: {},
    },
  });
};

exports.createPackage = (req, res, next) => {
  res.status(201).json({
    status: "Success",
    data: {
      package: {},
    },
  });
};

exports.updatePackage = (req, res, next) => {
  res.status(201).json({
    status: "Success",
    data: {
      package: {},
    },
  });
};

exports.deletePackage = (req, res, next) => {
  res.status(204).json({
    status: "Success",
    message: "Success",
  });
};
