import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../auth";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [adminCode, setAdminCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  const [error, setError] = useState("");

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  function submit(e) {
    e.preventDefault();

    const result = registerUser(form, role, adminCode);

    if (result !== "Registration successful!") {
      setError(result);
      return;
    }

    navigate("/login", {
      state: { registered: true }
    });
  }

  return (
    <main className="auth-page">
      <section className="auth-container">
        <div className="auth-banner">
          <Link to="/" className="auth-brand">
            <span>🌱</span>
            <b>Farm Connect</b>
          </Link>

          <div className="banner-content">
            <span className="welcome-tag">JOIN THE NETWORK</span>
            <h1>Better farming starts with better connections.</h1>
            <p>
              Create your account to access practical agricultural
              resources and updates.
            </p>
            <div className="farm-illustration">🌾　🚜　🌳</div>
            <h3>Empowering farmers, building futures.</h3>
          </div>

          <small className="banner-footer">
            Your trusted agricultural companion.
          </small>
        </div>

        <div className="auth-form-section">
          <form className="auth-form-content" onSubmit={submit}>
            <span className="eyebrow">GET STARTED</span>
            <h2>Create your account</h2>
            <p className="auth-subtitle">
              Choose an account type and fill in your details.
            </p>

            <label>Register as</label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setAdminCode("");
                setError("");
              }}
            >
              <option value="user">Farmer / User</option>
              <option value="admin">Administrator</option>
            </select>

            <label>Full name</label>
            <input
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Your full name"
              required
            />

            <label>Email address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              required
            />

            <label>Password</label>
            <input
              name="password"
              type="password"
              minLength="6"
              value={form.password}
              onChange={update}
              placeholder="At least 6 characters"
              required
            />

            <label>Mobile number</label>
            <input
              name="mobile"
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              value={form.mobile}
              onChange={update}
              placeholder="10-digit mobile number"
              required
            />

            {role === "admin" && (
              <>
                <label>Admin registration code</label>
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter administrator code"
                  required
                />
              </>
            )}

            {error && <p className="form-error">{error}</p>}

            <button className="auth-button" type="submit">
              Create account →
            </button>

            <p className="auth-switch">
              Already registered? <Link to="/login">Sign in</Link>
            </p>

            <Link to="/" className="back-home">
              ← Back to home
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}