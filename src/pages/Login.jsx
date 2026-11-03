
import { useState } from "react";
import { loginUser } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const user = loginUser(email, password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    alert("Login successful!");

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-banner">
          <div className="auth-brand">
            <span className="brand-icon">🌱</span>
            <h2>Farm Connect</h2>
          </div>

          <div className="banner-content">
            <h1>Welcome Back!</h1>
            <p>
              Connecting farmers with knowledge,
              resources and opportunities.
            </p>
            <div className="farm-illustration">🌾 🚜 🌳</div>
            <h3>Growing Together, Growing Better.</h3>
          </div>

          <p className="banner-footer">
            Your trusted agricultural partner.
          </p>
        </div>

        <div className="auth-form-section">

          <div className="auth-form-content">

            <h2>Login to Your Account</h2>
            <p className="auth-subtitle">
              Enter your details to continue.
            </p>

            <form onSubmit={handleSubmit}>

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="auth-button">
                Login →
              </button>

            </form>

            <p className="auth-switch">
              Don't have an account?
              {" "}
              <Link to="/register">Create Account</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to Home
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
