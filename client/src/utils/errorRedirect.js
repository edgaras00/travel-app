const errorRedirect = (message, navigate) => {
  if (message === "Resource not found") navigate("/404");
  if (message === "Server error") navigate("/error");
};

export default errorRedirect;
