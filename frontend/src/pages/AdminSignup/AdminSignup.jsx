import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignInAdmin from "../../components/AdminComponents/SignInAdmin/SignInAdmin";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import "./AdminSignup.css";

export default function AdminSignup() {
  const logInRef = useRef(null);
  const navigate = useNavigate();
  const { authenticated, userRole, setToken } = useContext(AuthContext);

  useEffect(() => {
    console.log("Auth Status:", authenticated, "Role:", userRole);
    if (authenticated && userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [authenticated, navigate, userRole]);
  

  return (
    <div className="SignUpForm">
      <ul className="ToggleForm">
        <li ref={logInRef} className={"Tab active"}>
          Log In
        </li>
      </ul>
      <SignInAdmin
        authenticated={authenticated}
        setToken={setToken}
        userRole={userRole}
      />
    </div>
  );
}
