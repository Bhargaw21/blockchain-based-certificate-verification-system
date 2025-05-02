import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api.jsx";
import MessagePopUp from "../../MessagePopUp/MessagePopUp.jsx";
import TextInput from "../../TextInput/TextInput.jsx";

export default function SignInAdmin({ authenticated, setToken, userRole }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");
  const navigate = useNavigate();

  if (authenticated && userRole === "admin") {
    navigate("/admin/dashboard");
  }

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (!signInEmail || !signInPassword) {
      setSignUpMessage("Please fill out all fields.");
      return;
    }

    const data = {
      email: signInEmail,
      password: signInPassword,
    };

    try {
      const response = await api.post("/login-admin", data);
      const token = response.data.token;
      localStorage.setItem("appCertificate", token);
      setToken(token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setSignUpMessage("An error occurred while connecting to the server.");
    }
  };

  return (
    <>
      {signUpMessage && (
        <MessagePopUp message={signUpMessage} setMessage={setSignUpMessage} />
      )}
      <form onSubmit={handleSignIn}>
        <div>
          <h1>Admin Sign In</h1>
        </div>
        <TextInput
          label="Admin Email"
          type="email"
          name="adminEmail"
          placeholder="admin@example.com"
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
