import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FarmerAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        setAlerts(
          JSON.parse(localStorage.getItem("farmAlerts") || "[]")
        );
      } catch {
        setAlerts([]);
      }
    };

    load();
    window.addEventListener("focus", load);

    return () => window.removeEventListener("focus", load);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          <img src="/logo.jpeg" alt="" />
          <div>
            <h2>Farm Connect</h2>
            <small>Farmer Friendly Portal</small>
          </div>
        </Link>

        <div className="account">
          <Link to="/user">Dashboard</Link>
        </div>
      </header>

      <nav className="categories">
        <Link to="/user">Dashboard</Link>
        <Link to="/crop-guide">Crop Guide</Link>
        <Link to="/market-prices">Market Prices</Link>
        <Link to="/government-schemes">Schemes</Link>
      </nav>

      <section className="dashboard">
        <h1>🔔 Farmer alerts</h1>

        <p>
          Important announcements published by the Farm Connect
          administrator.
        </p>

        <div className="dashboard-grid">
          {alerts.slice().reverse().map((a) => (
            <article className="dashboard-card" key={a.id}>
              <div className="card-icon">📢</div>
              <h3>{a.title}</h3>
              <p>{a.message}</p>
              <small>{a.date}</small>
            </article>
          ))}
        </div>

        {!alerts.length && (
          <div className="empty-state">
            <span>🔔</span>
            <h3>No alerts at the moment</h3>
            <p>
              New announcements will appear here when published.
            </p>
          </div>
        )}

        <Link to="/user">
          <button>← Back to dashboard</button>
        </Link>
      </section>

      <footer className="footer">
        <h3>Farm Connect</h3>
      </footer>
    </div>
  );
}