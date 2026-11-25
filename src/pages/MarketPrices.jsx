import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MarketPrices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        setPrices(
          JSON.parse(localStorage.getItem("marketPrices") || "[]")
        );
      } catch {
        setPrices([]);
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
        <h1>💰 Market price updates</h1>
        <p>
          Price records published by the Farm Connect administrator.
          Verify current prices with the market before selling.
        </p>

        <div className="dashboard-grid">
          {prices.map((p) => (
            <article className="dashboard-card" key={p.id}>
              <div className="card-icon">₹</div>
              <h3>{p.crop}</h3>
              <p>{p.market}</p>
              <h2>
                ₹{p.price}
                <small> / quintal</small>
              </h2>
              <p>Updated: {p.date}</p>
            </article>
          ))}
        </div>

        {!prices.length && (
          <div className="empty-state">
            <span>₹</span>
            <h3>No market records published yet</h3>
            <p>
              Market updates added by the administrator will appear here.
            </p>
          </div>
        )}

        <Link to="/user">
          <button>← Back to dashboard</button>
        </Link>
      </section>

      <footer className="footer">
        <h3>Farm Connect</h3>
        <p>Market information for informed farming decisions.</p>
      </footer>
    </div>
  );
}