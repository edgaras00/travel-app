import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

import { AppError } from "../../utils/AppError";
import { setRequestOptions } from "../../utils/setReqOptions";

import "../../styles/login.css";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(null);
  const { setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();
    setLoginError(null);

    if (!email || !password) {
      setLoginError("Please fill in all of the fields");
      return;
    }

    try {
      let url = "https://paradisetravel-api.onrender.com/api/users/login";
      if (process.env.REACT_APP_ENV === "development") {
        url = "/api/users/login";
      }
      const requestOptions = setRequestOptions("POST", { email, password });
      const response = await fetch(url, requestOptions);

      const data = await response.json();

      if (response.status !== 200) {
        throw new AppError(data.message, response.status);
      }

      setUser(data.data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.token);
      navigate(-1);
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-form"
        onSubmit={(event) => handleSubmit(event, emailInput, passwordInput)}
      >
        <div className="login-header">
          <h4>LOG INTO YOUR ACCOUNT</h4>
        </div>
        <div className="login-labels">
          <label htmlFor="email">Email address</label>
        </div>
        <input
          type="email"
          name="emailInput"
          id="email"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
        />
        <div className="login-labels">
          <label htmlFor="password">Password</label>
        </div>
        <input
          type="password"
          name="passwordInput"
          id="password"
          value={passwordInput}
          minLength={6}
          onChange={(event) => setPasswordInput(event.target.value)}
        />
        <div className="login-button-container">
          <button>LOG IN</button>
          {loginError ? <div className="login-error">{loginError}</div> : null}
        </div>
        <div className="link-signup">
          Need an account?{" "}
          <Link to="/signup">
            <span>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
