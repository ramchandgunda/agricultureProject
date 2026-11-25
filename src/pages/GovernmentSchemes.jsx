import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GovernmentSchemes() {
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        setSchemes(
          JSON.parse(localStorage.getItem("farmSchemes") || "[]")
        );
      } catch {
        setSchemes([]);
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
        <Link to="/weather">Weather</Link>
      </nav>

      <section className="dashboard">
        <h1>🏛️ Government schemes</h1>

        <p>
          Explore agricultural support information shared by the
          administrator. Always confirm eligibility and application
          details on official government websites.
        </p>

        <div className="dashboard-grid">
          {schemes.map((s) => (
            <article className="dashboard-card" key={s.id}>
              <div className="card-icon">📋</div>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <p><b>Eligibility:</b> {s.eligibility}</p>

              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  className="scheme-link"
                >
                  Visit official information ↗
                </a>
              )}
            </article>
          ))}
        </div>

        {!schemes.length && (
          <div className="empty-state">
            <span>🏛️</span>
            <h3>No schemes published yet</h3>
            <p>
              Government scheme information added by the administrator
              will appear here.
            </p>
          </div>
        )}

        <Link to="/user">
          <button>← Back to dashboard</button>
        </Link>
      </section>

      <footer className="footer">
        <h3>Farm Connect</h3>
        <p>Verify all scheme details through official sources.</p>
      </footer>
    </div>
  );
}