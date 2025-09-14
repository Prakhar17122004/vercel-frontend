import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';

const Signup = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");    
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: name, email, password }),
      });

      console.log("Raw response status:", response.status);

      const data = await response.json(); // read JSON once
      console.log("Response data:", data);

      if (!response.ok) {
        setError(data.message || "Server error, try again later");
        return;
      }

      alert(data.message); // "User created successfully"
      navigate("/login");  // redirect to login page
    } catch (err) {
      console.error("Frontend error:", err);
      setError("Server error, try again later");
    }
  };

  return (
    <>
      
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card shadow p-4 w-100"
          style={{ maxWidth: "400px", borderRadius: "12px" }}
        >
          <h3 className="text-center mb-4">Signup</h3>

          <input
            type="text"
            className="form-control mb-3 shadow-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            Create Account
          </button>

          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none" style={{ color: "#67C090" }}>
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </>
  );
};

export default Signup;
