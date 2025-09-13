import React from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar/SearchBar";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ searchQuery, setSearchQuery, theme, toggleTheme }) => {
  const [username, setUsername] = React.useState(localStorage.getItem("username") || "");
  const navigate = useNavigate();

  React.useEffect(() => {
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const onLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUsername("");
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">
        <a 
          className="navbar-brand fw-semibold" 
          href="#"
          style={{ color: theme === "dark" ? "#6bb3d4" : "#26667F" }}
        >
          NerdNotes
        </a>

        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onClearSearch={() => setSearchQuery("")}
          theme={theme}
        />

        <div className="d-flex align-items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
            onClick={toggleTheme}
            style={{ 
              
              width: "40px", 
              height: "40px",
              border: theme === "dark" ? "1px solid #6bb3d4" : "1px solid #26667F",
              color: theme === "dark" ? "#6bb3d4" : "#26667F",
              backgroundColor: "transparent"
            }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <ProfileInfo
            username={username}
            onLogout={onLogout}
            theme={theme}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;