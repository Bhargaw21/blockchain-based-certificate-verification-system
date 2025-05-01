import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./CustomHooks/Context/AuthProvider";

// Pages
import Admin from "./pages/Admin/Admin";
import AdminSignup from "./pages/AdminSignup/AdminSignup";
import HomePage from "./pages/Home/HomePage";
import School from "./pages/School/School";
import Signup from "./pages/SignUp/SignUp";
import SignUpSchoolPage from "./pages/SignUpSchoolPage/SignUpSchoolPage";
import UserPage from "./pages/UserPage/UserPage";
import VerifyCertificate from "./pages/VerifyCertificate/VerifyCertificate";


// ProtectedRoute component for role-based access control
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("appCertificate");

  if (!token) return <Navigate to="/" />; // Redirect if no token found

  try {
    // Decode the token to get the user's role
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload.role;

    // Check if the user's role matches the allowed role
    if (userRole === allowedRole) {
      return children;
    } else {
      return <Navigate to="/" />; // Redirect if role doesn't match
    }
  } catch (e) {
    console.error("Invalid token:", e);
    return <Navigate to="/" />; // Redirect if token is invalid
  }
};

const UserPageWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);
  return (
    <ProtectedRoute allowedRole="user">
      <UserPage />
    </ProtectedRoute>
  );
};

const SchoolWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);
  return (
    <ProtectedRoute allowedRole="school">
      <School />
    </ProtectedRoute>
  );
};

const AdminWrapper = () => {
  const { authenticated, userRole } = useContext(AuthContext);
  return (
    <ProtectedRoute allowedRole="admin">
      <Admin />
    </ProtectedRoute>
  );
};

function App() {
  const { token, authenticated, setToken } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/user/signup"
            element={<Signup authenticated={authenticated} setToken={setToken} token={token} />}
          />
          <Route
            path="/school/signup"
            element={<SignUpSchoolPage authenticated={authenticated} setToken={setToken} />}
          />
          <Route
            path="/admin/signup"
            element={<AdminSignup authenticated={authenticated} setToken={setToken} />}
          />
          <Route path="/verify" element={<VerifyCertificate />} />

          {/* Protected Routes */}
          <Route path="/user/dashboard" element={<UserPageWrapper />} />
          <Route path="/school/dashboard" element={<SchoolWrapper />} />
          <Route path="/admin/dashboard" element={<AdminWrapper />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
