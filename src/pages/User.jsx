import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../auth";

const read = key => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const services = [
  ["🌱", "Crop Guide", "/crop-guide", "Explore crop cultivation guides."],

  ["🧪", "Fertilizers", "/fertilizers", "Understand nutrients and soil care."],

  ["₹", "Market Prices", "/market-prices", "Review agricultural market prices."],

  ["🏛️", "Government Schemes", "/government-schemes", "Explore farmer support resources."],

  ["🌦️", "Weather", "/weather", "Automatic weather forecasts and alerts."],

  ["🔔", "Farmer Alerts", "/farmer-alerts", "Read important announcements."],

  ["🤝", "Community", "/farmer-community", "Share farming experiences."],

  ["👨‍🌾", "Expert Help", "/expert-help", "Find agricultural guidance."],

  ["🛒", "Farm Store", "/farm-store", "Explore farm equipment and inputs."],

  ["🗺️", "India Crop Atlas", "/india-crop-map", "Explore state crops and trade corridors."]
];

export default function User() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [crops, setCrops] = useState([]);
  const [prices, setPrices] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All crops");

  useEffect(() => {

    if (!user || user.role !== "user") {
      navigate("/login", { replace: true });
      return;
    }

    const refresh = () => {
      setCrops(read("farmCrops"));
      setPrices(read("marketPrices"));
      setSchemes(read("farmSchemes"));
      setAlerts(read("farmAlerts"));
    };

    refresh();

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
    };

  }, []);

  const categories = useMemo(
    () => [
      "All crops",
      ...new Set(crops.map(c => c.category).filter(Boolean))
    ],
    [crops]
  );

  const results = useMemo(
    () => crops.filter(c => {

      const text =
        `${c.name} ${c.category} ${c.season} ${c.description}`
          .toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (category === "All crops" || c.category === category)
      );

    }),
    [crops, search, category]
  );

  if (!user || user.role !== "user") return null;

  function signOut() {
    logoutUser();
    navigate("/login");
  }

  return (
    <div className="farmer-shell">

      <header className="farmer-topbar">

        <Link to="/" className="admin-brand">

          <span className="brand-mark">🌱</span>

          <span>
            Farm<span>Connect</span>
            <small>FARMER PORTAL</small>
          </span>

        </Link>

        <nav>
          <a href="#crop-finder">Find a crop</a>
          <a href="#market">Market updates</a>
          <Link to="/weather">Weather</Link>
          <a href="#services">Services</a>
        </nav>

        <div className="farmer-user">

          <span className="avatar">
            {(user.name || "F").charAt(0).toUpperCase()}
          </span>

          <span>{user.name}</span>

          <button onClick={signOut}>
            Sign out
          </button>

        </div>

      </header>

      <main className="farmer-content">

        <section className="farmer-hero">

          <div className="farmer-hero-copy">

            <span className="welcome-tag">
              YOUR FARM. YOUR FUTURE.
            </span>

            <h1>
              Welcome, {(user.name || "Farmer").split(" ")[0]}!
            </h1>

            <p>
              Discover agricultural resources, weather reports,
              market information and opportunities for your farm.
            </p>

            <a
              className="hero-cta"
              href="#crop-finder"
            >
              Explore crop guides →
            </a>

          </div>

          <div className="hero-illustration">
            🌾<span>☀️</span><i>🌱</i>
          </div>

        </section>

        <section className="farmer-stat-row">

          {[
            ["🌱", crops.length, "Crop guides"],
            ["₹", prices.length, "Market records"],
            ["🏛️", schemes.length, "Farmer schemes"],
            ["🔔", alerts.length, "Active updates"]
          ].map(([icon, value, title]) => (

            <article key={title}>

              <span>{icon}</span>

              <div>
                <b>{value}</b>
                <small>{title}</small>
              </div>

            </article>

          ))}

        </section>

        <section className="farmer-section">

          <div className="section-heading">

            <div>
              <span className="eyebrow">SMART FARMING</span>
              <h2>Weather & Agricultural Resources</h2>
            </div>

          </div>

          <div className="farmer-info-grid">

            <article className="info-card">
              <span className="info-icon">🌦️</span>
              <h3>Automatic Weather</h3>
              <p>
                Configure your location to receive updated forecasts
                and weather alerts.
              </p>
              <Link to="/weather">
                Open Weather →
              </Link>
            </article>

            <article className="info-card">
              <span className="info-icon">🛒</span>
              <h3>Farm Store</h3>
              <p>
                Explore seeds, irrigation equipment and useful tools.
              </p>
              <Link to="/farm-store">
                Explore Products →
              </Link>
            </article>

            <article className="info-card">
              <span className="info-icon">🗺️</span>
              <h3>India Crop Atlas</h3>
              <p>
                Discover state-wise crops and example trade corridors.
              </p>
              <Link to="/india-crop-map">
                Explore India →
              </Link>
            </article>

          </div>

        </section>

        <section
          className="farmer-section"
          id="crop-finder"
        >

          <div className="section-heading">

            <div>
              <span className="eyebrow">CROP DISCOVERY</span>
              <h2>What are you planning to grow?</h2>
              <p>Search crops by name, category or growing season.</p>
            </div>

          </div>

          <div className="crop-finder">

            <span>⌕</span>

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Rice, Wheat, Cotton..."
            />

            <button
              onClick={() => {
                setSearch("");
                setCategory("All crops");
              }}
            >
              Clear
            </button>

          </div>

          <div className="filter-row">

            {categories.map(c => (

              <button
                key={c}
                className={
                  category === c
                    ? "filter-chip selected"
                    : "filter-chip"
                }
                onClick={() => setCategory(c)}
              >
                {c}
              </button>

            ))}

          </div>

          {results.length ? (

            <div className="farmer-crop-grid">

              {results.map(crop => (

                <article
                  className="farmer-crop-card"
                  key={crop.id}
                >

                  <div className="crop-card-top">
                    <span>🌿</span>
                    <small>{crop.category}</small>
                  </div>

                  <h3>{crop.name}</h3>

                  <p>{crop.description}</p>

                  <div className="crop-season">
                    Growing season
                    <b>{crop.season}</b>
                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <span>🌱</span>

              <h3>
                {crops.length
                  ? "No matching crops found"
                  : "Your crop library is getting ready"}
              </h3>

              <p>
                {crops.length
                  ? "Try another crop name."
                  : "Crop guides published by Admin will appear here."}
              </p>

              <Link to="/crop-guide">
                Browse Crop Guide →
              </Link>

            </div>

          )}

        </section>

        <section
          className="farmer-section"
          id="market"
        >

          <div className="section-heading">

            <div>
              <span className="eyebrow">MARKET INTELLIGENCE</span>
              <h2>Market Price Updates</h2>
              <p>Price records published by the administrator.</p>
            </div>

            <Link to="/market-prices">
              View All →
            </Link>

          </div>

          <div className="farmer-info-grid">

            {prices.slice(-3).reverse().map(p => (

              <article
                className="info-card"
                key={p.id}
              >

                <span className="info-icon">₹</span>

                <h3>{p.crop}</h3>

                <p>{p.market}</p>

                <strong>
                  ₹{p.price}
                  <small> / quintal</small>
                </strong>

                <small>{p.date}</small>

              </article>

            ))}

            {!prices.length && (

              <div className="empty-state compact">
                Market prices will appear here when published.
              </div>

            )}

          </div>

        </section>

        <section className="farmer-section">

          <div className="section-heading">
            <div>
              <span className="eyebrow">STAY INFORMED</span>
              <h2>Announcements & Support</h2>
            </div>
          </div>

          <div className="farmer-info-grid">

            <article className="info-card">

              <span className="info-icon">🔔</span>

              <h3>Farmer Alerts</h3>

              <p>{alerts.length} announcements available</p>

              <Link to="/farmer-alerts">
                Read Alerts →
              </Link>

            </article>

            <article className="info-card">

              <span className="info-icon">🏛️</span>

              <h3>Government Schemes</h3>

              <p>{schemes.length} resources published</p>

              <Link to="/government-schemes">
                Explore Schemes →
              </Link>

            </article>

            <article className="info-card">

              <span className="info-icon">👨‍🌾</span>

              <h3>Expert Help</h3>

              <p>Find useful guidance for agricultural questions.</p>

              <Link to="/expert-help">
                Get Guidance →
              </Link>

            </article>

          </div>

        </section>

        <section
          className="farmer-section"
          id="services"
        >

          <div className="section-heading">

            <div>
              <span className="eyebrow">FARM CONNECT TOOLS</span>
              <h2>Explore All Services</h2>
            </div>

          </div>

          <div className="service-grid">

            {services.map(([icon, title, path, desc]) => (

              <Link
                to={path}
                className="service-tile"
                key={path}
              >

                <span>{icon}</span>

                <div>
                  <b>{title}</b>
                  <small>{desc}</small>
                </div>

                <i>↗</i>

              </Link>

            ))}

          </div>

        </section>

        <footer className="farmer-footer">
          © 2026 Farm Connect · Growing Together, Growing Better.
        </footer>

      </main>

    </div>
  );
}