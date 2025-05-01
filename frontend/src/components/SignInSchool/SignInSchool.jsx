import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api.jsx";
import MessagePopUp from "../MessagePopUp/MessagePopUp";
import TextInput from "../TextInput/TextInput";

export default function SignInSchool({ authenticated, setToken, userRole }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const navigate = useNavigate();

  if (authenticated && userRole === "school") {
    navigate("/school/dashboard");
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }

    const data = {
      email: signInEmail,
      password: signInPassword,
    };

    api
      .post("/login", data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("appCertificate", token);
        setToken(token);

        const tokenPayload = JSON.parse(atob(token.split('.')[1]));

        if (tokenPayload.role === "school") {
          navigate("/school/dashboard");
        } else if (tokenPayload.role === "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.data?.message) {
          setSignUpMessage(error.response.data.message);
        } else {
          setSignUpMessage("An error occurred while connecting to the server");
        }
      });
  };

  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <form onSubmit={handleSignIn}>
        <div>
          <h1>Sign In</h1>
        </div>
        <TextInput
          label="School Email"
          type="email"
          name="email"
          placeholder="School Email"
          value={signInEmail}
          setValue={setSignInEmail}
        />
        <TextInput
          label="Password"
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
    </>
  );
}
