// ============ ProfileInfo.js ============
import React from "react";

// Helper to get initials
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.split(" ");
  return parts.length > 1
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase();
};

const ProfileInfo = ({ username, onLogout, theme }) => {
  return (
    <div className="dropdown">
      <button
        className={`btn ${theme === "dark" ? "btn-secondary" : "btn-light"} rounded-circle shadow-sm d-flex align-items-center justify-content-center`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ width: "40px", height: "40px" }}
      >
        {getInitials(username || "")}
      </button>

      <ul className={`dropdown-menu dropdown-menu-end shadow-sm ${
        theme === "dark" ? "dropdown-menu-dark" : ""
      }`}>
        <li className="dropdown-item-text fw-semibold text-secondary">
          <span className="me-3 fw-semibold">{username}</span>
        </li>
        <li><hr className="dropdown-divider" /></li>

        <li>
          <button className="dropdown-item text-danger" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
