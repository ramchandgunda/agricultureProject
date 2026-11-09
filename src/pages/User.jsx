
import { useState } from "react";
import { getCurrentUser, logoutUser } from "../auth";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./Dashboard.css";

const readData = key =>
  JSON.parse(localStorage.getItem(key) || "[]");

function User() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [crops] = useState(() => readData("farmCrops"));
  const [prices] = useState(() => readData("marketPrices"));
  const [schemes] = useState(() => readData("farmSchemes"));
  const [alerts] = useState(() => readData("farmAlerts"));
  const [queries, setQueries] = useState(() => readData("expertQueries"));

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!user || user.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  const modules = [
    ["Crop Guide", "Explore crop information and farming tips.", "/crop-guide"],
    ["Fertilizers", "Learn about fertilizers and crop nutrients.", "/fertilizers"],
    ["Market Prices", "Check current crop market prices.", "/market-prices"],
    ["Government Schemes", "Explore farmer schemes and subsidies.", "/government-schemes"],
    ["Weather Updates", "Check weather information for farming.", "/weather"],
    ["Farmer Alerts", "View important announcements.", "/farmer-alerts"],
    ["Farmer Community", "Connect with other farmers.", "/farmer-community"],
    ["Expert Help", "Get guidance from agricultural experts.", "/expert-help"]
  ];

  function submitQuestion(e) {
    e.preventDefault();

    const updated = [
      ...queries,
      {
        id: Date.now(),
        farmer: user.name,
        email: user.email,
        subject,
        message,
        reply: "",
        status: "Pending"
      }
    ];

    localStorage.setItem("expertQueries", JSON.stringify(updated));
    setQueries(updated);
    setSubject("");
    setMessage("");
    alert("Your question has been submitted!");
  }

  function logout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="farmer-layout">
      <header className="farmer-header">
        <div className="farmer-brand">🌱 Farm Connect</div>
        <div>
          <span>Welcome, {user.name || "Farmer"}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="farmer-main">
        <div className="farmer-welcome">
          <h1>Your Farming Dashboard 🌾</h1>
          <p>Find agricultural information and services in one place.</p>
        </div>

        <h2>Available Crops</h2>
        <div className="farmer-grid">
          {crops.length === 0 ? (
            <p>No crops added yet.</p>
          ) : crops.map(crop => (
            <div className="farmer-card" key={crop.id}>
              <h3>🌾 {crop.name}</h3>
              <p>Category: {crop.category}</p>
              <p>Season: {crop.season}</p>
              <strong>₹{Number(crop.price).toLocaleString("en-IN")} / Quintal</strong>
            </div>
          ))}
        </div>

        <h2>Latest Market Prices</h2>
        <div className="farmer-grid">
          {prices.length === 0 ? (
            <p>No market prices available.</p>
          ) : prices.map(price => (
            <div className="farmer-card" key={price.id}>
              <h3>📊 {price.crop}</h3>
              <p>Market: {price.market}</p>
              <h3>₹{Number(price.price).toLocaleString("en-IN")}</h3>
              <small>{price.date}</small>
            </div>
          ))}
        </div>

        <h2>Government Schemes</h2>
        <div className="farmer-grid">
          {schemes.length === 0 ? (
            <p>No schemes published yet.</p>
          ) : schemes.map(scheme => (
            <div className="farmer-card" key={scheme.id}>
              <h3>🏛️ {scheme.title}</h3>
              <p>{scheme.description}</p>
              <p><b>Eligibility:</b> {scheme.eligibility}</p>
            </div>
          ))}
        </div>

        <h2>Farmer Alerts</h2>
        <div className="farmer-grid">
          {alerts.length === 0 ? (
            <p>No new alerts.</p>
          ) : alerts.map(alert => (
            <div className="farmer-card alert-card" key={alert.id}>
              <h3>🔔 {alert.title}</h3>
              <p>{alert.message}</p>
              <small>{alert.date}</small>
            </div>
          ))}
        </div>

        <h2>Ask an Agricultural Expert</h2>
        <form className="management-form" onSubmit={submitQuestion}>
          <input
            placeholder="Question Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder="Describe your farming question..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />
          <button className="primary-btn">Submit Question</button>
        </form>

        <h2>My Expert Queries</h2>
        {queries.filter(q => q.email === user.email).map(q => (
          <div className="farmer-card" key={q.id}>
            <h3>{q.subject}</h3>
            <p>{q.message}</p>
            <p><b>Status:</b> {q.status}</p>
            <p><b>Expert Reply:</b> {q.reply || "Waiting for expert response."}</p>
          </div>
        ))}

        <h2>Available Farmer Services</h2>
        <div className="farmer-grid">
          {modules.map(([name, description, path]) => (
            <div className="farmer-card" key={name}>
              <h3>{name}</h3>
              <p>{description}</p>
              <Link to={path} className="primary-link">Explore →</Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default User;
