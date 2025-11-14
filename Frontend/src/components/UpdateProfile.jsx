import React from "react";
import { useState, useEffect } from "react";
import "../App.css";

const API_BASE = "http://localhost:5000/api";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user profile
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/me`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const user = data.user;
        setName(user.name || "");
        setBio(user.bio || "");
        if (user.profilePic) {
          setProfilePicPreview(`http://localhost:5000/${user.profilePic}`);
        }
      } else {
        setError("Failed to fetch user profile");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Update name and bio
      if (name || bio !== undefined) {
        const response = await fetch(`${API_BASE}/user/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, bio }),
        });

        if (!response.ok) {
          const { msg } = await response.json();
          setError(msg || "Failed to update profile");
          setLoading(false);
          return;
        }
      }

      // Update profile picture if a new one is selected
      if (profilePicFile) {
        const formData = new FormData();
        formData.append("profilePicture", profilePicFile);

        const response = await fetch(`${API_BASE}/user/profilePic`, {
          method: "PUT",
          credentials: "include",
          body: formData,
        });

        if (!response.ok) {
          const { msg } = await response.json();
          setError(msg || "Failed to update profile picture");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setProfilePicPreview(`http://localhost:5000/${data.profilePic}`);
        setProfilePicFile(null);
      }

      setSuccess("Profile updated successfully!");
      fetchUserProfile();
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Update Profile</h1>

      {/* Profile Update Form */}
      <div className="form-section">
        <h2>Profile Information</h2>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Profile Picture:</label>
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="profile-pic-preview"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>

      {/* Messages */}
      {error && <div className="message message-error">{error}</div>}
      {success && <div className="message message-success">{success}</div>}
    </div>
  );
}
