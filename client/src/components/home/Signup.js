import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";

import { AppError } from "../../utils/AppError";
import { setRequestOptions } from "../../utils/setReqOptions";

import "../../styles/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState(null);

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (
    event,
    name,
    email,
    password,
    confirmPassword
  ) => {
    event.preventDefault();

    setSignupError(null);

    if (!name || !email || !password || !confirmPassword) {
      setSignupError("Please fill in all of the fields");
      return;
    }

    if (password !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const requestOptions = setRequestOptions("POST", {
        name,
        email,
        password,
      });
      const response = await fetch("/api/users/signup", requestOptions);
      // const response = await fetch(
      //   "https://travelparadise.herokuapp.com/api/users/signup",
      //   requestOptions
      // );
      const data = await response.json();

      if (response.status !== 201) {
        throw new AppError(data.message, response.status);
      }

      setUser(data.data.user);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(data.data.user));
    } catch (error) {
      console.error(error);
      if (error.statusCode === 500) {
        setSignupError("Something went wrong. Please try again later.");
        return;
      }
      if (error.message.startsWith("Duplicate field")) {
        setSignupError("User with this email already exists");
        return;
      }
      setSignupError(error.message);
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
          <label htmlFor="name">Name</label>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="login-labels">
          <label htmlFor="email">Email address</label>
        </div>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="login-labels">
          <label htmlFor="password-input">Password</label>
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
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          minLength={6}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <div className="signup-button-container">
          <button>SIGN UP</button>
          {signupError ? (
            <div className="signup-error">{signupError}</div>
          ) : null}
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
