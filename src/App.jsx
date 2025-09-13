import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import "./App.css";

function App() {
 const [theme, setTheme] = React.useState(localStorage.getItem("theme") || "light");

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);  // ✅ persist
};

React.useEffect(() => {
  document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
}, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home theme={theme} toggleTheme={toggleTheme} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
