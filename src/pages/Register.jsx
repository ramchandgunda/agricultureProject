
import { useState } from "react";
import { registerUser } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    const result = registerUser({
      ...form,
      role: "user"
    });

    alert(result);

    if (result === "Registration successful!") {
      navigate("/login");
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
            <h1>Join Our Farming Community!</h1>
            <p>
              Create your account and explore useful
              agricultural information and services.
            </p>
            <div className="farm-illustration">🌾 🚜 🌳</div>
            <h3>Empowering Farmers, Building Futures.</h3>
          </div>

          <p className="banner-footer">
            Together for a better farming future.
          </p>
        </div>

        <div className="auth-form-section">

          <div className="auth-form-content">

            <h2>Create Account</h2>
            <p className="auth-subtitle">
              Register as a farmer to get started.
            </p>

            <form onSubmit={handleSubmit}>

              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={form.mobile}
                onChange={(e) =>
                  setForm({ ...form, mobile: e.target.value })
                }
                required
              />

              <button type="submit" className="auth-button">
                Create Account →
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?
              {" "}
              <Link to="/login">Login</Link>
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

export default Register;
