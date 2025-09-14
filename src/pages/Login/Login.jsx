import React from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { motion } from 'framer-motion';



const Login = () => {
  const [email, setEmail] = React.useState("");    
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Email & Password are required");
    return;
  }

  try {
    const response = await fetch("https://vercel-backend-lyart-beta.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Invalid credentials");
      return;
    }

    // ✅ Save details returned by backend
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.fullname); // <-- FIXED
    localStorage.setItem("isLoggedIn", true);

    alert("Login successful!");
    navigate("/home");

  } catch (err) {
    console.error("Frontend error:", err);
    setError("Server error, try again later");
  }
};


  return (
    <>
      
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card shadow p-4 w-100"
          style={{ maxWidth: "400px", borderRadius: "12px" }}
        >
          <h3 className="text-center mb-4">Login</h3>

          <input
            type="email"
            className="form-control mb-3 shadow-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="text-danger small mb-1">{error}</p>}

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#DDF4E7", color: "#67C090", fontWeight: "bold" }}
          >
            Login
          </button>

          <p className="text-center mt-3 small">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none" style={{ color: "#67C090" }}>
              Signup
            </Link>
          </p>
        </motion.form>
      </div>
    </>
  );
};

export default Login;
