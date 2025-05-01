import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      <h1 className="home-title">🎓 Blockchain Certificate Verification</h1>
      <p className="home-subtitle">Secure | Verifiable | Decentralized</p>

      <div className="role-grid">
        <div onClick={() => navigate("/user/signup")} className="role-card user">
          <h2>👤 User</h2>
          <p>Access, verify and manage your certificates.</p>
        </div>
        <div onClick={() => navigate("/school/signup")} className="role-card school">
          <h2>🏫 School</h2>
          <p>Issue verified certificates to students easily.</p>
        </div>
        <div onClick={() => navigate("/admin/signup")} className="role-card admin">
          <h2>🛡 Admin</h2>
          <p>Manage system roles and monitor the platform.</p>
        </div>
      </div>
    </div>
  );
}
