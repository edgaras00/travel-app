import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import "../styles/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (
    event,
    name,
    email,
    password,
    confirmPassword
  ) => {
    try {
      event.preventDefault();
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match!");
      }

      const signupBody = { name, email, password };
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupBody),
      };
      const response = await fetch("/api/users/signup", requestOptions);
      const data = await response.json();
      console.log(data);
      setUser(data.data.user);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={(event) =>
          handleSubmit(event, name, email, password, confirmPassword)
        }
      >
        <div className="login-header">
          <h4>CREATE YOUR ACCOUNT</h4>
        </div>
        <div className="login-labels">
          <label>Name</label>
        </div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="login-labels">
          <label>Email address</label>
        </div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="login-labels">
          <label>Password</label>
        </div>
        <input
          type="password"
          name="password"
          value={password}
          id="password-input"
          minLength={6}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="pass-length">
          <span>
            {password.length < 6
              ? "Password must be at least 6 characters."
              : null}
          </span>
        </div>
        <div className="login-labels">
          <label>Confirm password</label>
        </div>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          minLength={6}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <div className="login-button-container">
          <button disabled={password.length < 6 && confirmPassword.length < 6}>
            SIGN UP
          </button>
        </div>
        <div className="link-signup">
          Have an account?{" "}
          <Link to="/login">
            <span>Log in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
