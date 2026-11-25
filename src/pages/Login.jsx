import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../auth";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();

    const account = loginUser(email, password, role);

    if (!account) {
      setError(
        "We couldn't find an account with those details and account type."
      );
      return;
    }

    navigate(
      account.role === "admin" ? "/admin" : "/user",
      { replace: true }
    );
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
            <span className="welcome-tag">GROW WITH CONFIDENCE</span>
            <h1>Welcome back to your farming community.</h1>
            <p>
              Knowledge, tools and opportunities to help your farm
              move forward.
            </p>
            <div className="farm-illustration">🌾　🚜　🌳</div>
            <h3>Growing together, growing better.</h3>
          </div>

          <small className="banner-footer">
            A smarter way to stay connected to agriculture.
          </small>
        </div>

        <div className="auth-form-section">
          <form className="auth-form-content" onSubmit={submit}>
            <span className="eyebrow">YOUR ACCOUNT</span>
            <h2>Sign in</h2>
            <p className="auth-subtitle">
              Enter your details to continue to Farm Connect.
            </p>

            <label>Sign in as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Farmer / User</option>
              <option value="admin">Administrator</option>
            </select>

            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
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

            {error && <p className="form-error">{error}</p>}

            <button className="auth-button" type="submit">
              Sign in →
            </button>

            {role === "admin" && (
              <p className="demo-hint">
                Demo administrator: admin@farmconnect.com · Admin@123
              </p>
            )}

            <p className="auth-switch">
              New to Farm Connect? <Link to="/register">Create an account</Link>
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