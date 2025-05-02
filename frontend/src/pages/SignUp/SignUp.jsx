import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp({ authenticated, setToken, token }) {
  const signUpRef = useRef(null);
  const logInRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    loginPassword: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authenticated) {
      navigate("/user/dashboard");
    }
  }, [authenticated, navigate]);

  function handleTabClick(event) {
    if (event.target === signUpRef.current) {
      setShowSignUp(true);
      setErrors({});
    } else if (event.target === logInRef.current) {
      setShowSignUp(false);
      setErrors({});
    }
  }

  const validateSignUp = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (/\d/.test(formData.name)) newErrors.name = "Name cannot contain numbers.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be more than 8 characters.";

    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.loginEmail.trim()) newErrors.loginEmail = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.loginEmail)) newErrors.loginEmail = "Invalid email format.";

    if (!formData.loginPassword) newErrors.loginPassword = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;
    console.log("Sign Up Validated: ", formData);
    // API integration goes here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    console.log("Login Validated: ", formData);
    // API integration goes here
  };

  return (
    <div className="SignUpForm">
      <ul className="ToggleForm">
        <li
          ref={signUpRef}
          className={showSignUp ? "Tab active" : "Tab"}
          onClick={handleTabClick}
        >
          Sign Up
        </li>
        <li
          ref={logInRef}
          className={!showSignUp ? "Tab active" : "Tab"}
          onClick={handleTabClick}
        >
          Log In
        </li>
      </ul>

      {showSignUp ? (
        <form onSubmit={handleSignUpSubmit} className="SignUpFormContainer">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>

          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit} className="SignInFormContainer">
          <label>
            Email
            <input
              type="email"
              name="loginEmail"
              value={formData.loginEmail}
              onChange={handleChange}
            />
            {errors.loginEmail && <p className="error">{errors.loginEmail}</p>}
          </label>

          <label>
            Password
            <input
              type="password"
              name="loginPassword"
              value={formData.loginPassword}
              onChange={handleChange}
            />
            {errors.loginPassword && <p className="error">{errors.loginPassword}</p>}
          </label>

          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
}
