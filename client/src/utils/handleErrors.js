const handleErrors = (statusCode) => {
  if (statusCode === 404) {
    throw new Error("Resource not found");
  } else {
    throw new Error("Server error");
  }
};

export default handleErrors;
