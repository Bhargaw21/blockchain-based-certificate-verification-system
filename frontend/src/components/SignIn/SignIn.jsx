import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.jsx";
import LoadingAnimation from "../Loading/Loading.jsx";
import MessagePopUp from "../MessagePopUp/MessagePopUp";
import TextInput from "../TextInput/TextInput";

export default function SignIn({ authenticated, setToken, token }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (authenticated) {
    navigate("/user/dashboard");
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }
    setIsLoading(true);

    const data = {
      email: signInEmail, // ✅ FIXED here
      password: signInPassword,
    };

    api
      .post("/login", data)
      .then((response) => {
        localStorage.setItem("appCertificate", response.data.token);
        setToken(localStorage.getItem("appCertificate"));
        navigate("/user/dashboard");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setSignUpMessage(error.response.data.message);
        } else {
          setSignUpMessage("An error occurred while connecting to the server.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingAnimation />}
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      {!isLoading && (
        <form onSubmit={handleSignIn}>
          <div>
            <h1>Sign In</h1>
          </div>
          <TextInput
            label="email"
            type="email"
            name="email"
            placeholder="email"
            value={signInEmail}
            setValue={setSignInEmail}
          />
          <TextInput
            label="password"
            type="password"
            name="password"
            placeholder="********"
            value={signInPassword}
            setValue={setSignInPassword}
          />
          <button className="btn_login button-block" type="submit">
            Sign In
          </button>
        </form>
      )}
    </>
  );
}
