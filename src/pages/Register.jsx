
import { useState } from "react";
import { registerUser } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [adminCode, setAdminCode] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    const result = registerUser(form, role, adminCode);

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
            <h1>Join Farm Connect!</h1>
            <p>
              Create your account and access agricultural
              services and management features.
            </p>

            <div className="farm-illustration">
              🌾 🚜 🌳
            </div>

            <h3>Growing Together, Growing Better.</h3>
          </div>

          <p className="banner-footer">
            Your trusted agricultural partner.
          </p>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-content">

            <h2>Create Account</h2>

            <p className="auth-subtitle">
              Select your account type to continue.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Account Type Selection */}
              <label>Register As</label>

              <select
                className="account-type-select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setAdminCode("");
                }}
                required
              >
                <option value="user">🌱 Farmer / User</option>
                <option value="admin">🛡️ Administrator</option>
              </select>

              {/* Full Name */}
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

              {/* Email */}
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

              {/* Password */}
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                minLength="6"
                required
              />

              {/* Mobile */}
              <label>Mobile Number</label>

              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={form.mobile}
                onChange={(e) =>
                  setForm({ ...form, mobile: e.target.value })
                }
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />

              {/* Admin Registration Code */}
              {role === "admin" && (
                <>
                  <label>Admin Registration Code</label>

                  <input
                    type="password"
                    placeholder="Enter admin registration code"
                    value={adminCode}
                    onChange={(e) =>
                      setAdminCode(e.target.value)
                    }
                    required
                  />

                  <p className="auth-subtitle">
                    Enter the authorized code to create
                    an administrator account.
                  </p>
                </>
              )}

              {/* Submit */}
              <button type="submit" className="auth-button">
                {role === "admin"
                  ? "Create Admin Account →"
                  : "Create Farmer Account →"}
              </button>

            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>

            <p className="auth-switch">
              Already an administrator?{" "}
              <Link to="/login">Admin Login</Link>
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
