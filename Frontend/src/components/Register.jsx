import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "./API.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("bio", bio);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        const { msg } = await response.json();
        setError(msg || "Unable to register. Please try again.");
        return;
      }
      navigate("/UserProfile");
    } catch (err) {
      console.log(err);
      setError("Network error. Please try again.");
    }
  };
  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="form-section">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Choose a password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <input
                type="text"
                placeholder="Short bio (optional)"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Picture (optional)</label>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0] || null)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>

          {error && <div className="message message-error mt-3">{error}</div>}

          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="link-button">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
