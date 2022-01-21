import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import "../styles/login.css";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event, email, password) => {
    try {
      event.preventDefault();
      const loginBody = { email, password };
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginBody),
      };
      const response = await fetch("/api/users/login", requestOptions);

      const data = await response.json();
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      navigate(-1);
    } catch (error) {
      console.log(error);
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
          <label>Email address</label>
        </div>
        <input
          type="email"
          name="emailInput"
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
        />
        <div className="login-labels">
          <label>Password</label>
        </div>
        <input
          type="password"
          name="passwordInput"
          value={passwordInput}
          onChange={(event) => setPasswordInput(event.target.value)}
        />
        <div className="login-button-container">
          <button>LOGIN</button>
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
