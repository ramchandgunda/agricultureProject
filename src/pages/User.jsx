import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../auth";

const read = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const services = [
  ["🌱", "Crop guide", "/crop-guide", "Explore cultivation guides and crop information."],
  ["🧪", "Fertilizers", "/fertilizers", "Understand nutrients and soil care."],
  ["₹", "Market prices", "/market-prices", "Review price information published by the admin."],
  ["🏛️", "Government schemes", "/government-schemes", "Explore farmer support resources."],
  ["🌦️", "Weather", "/weather", "Read weather planning information."],
  ["🔔", "Farmer alerts", "/farmer-alerts", "Stay aware of important announcements."],
  ["🤝", "Community", "/farmer-community", "Learn and share farming experiences."],
  ["👨‍🌾", "Expert help", "/expert-help", "Find guidance for farming questions."]
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
      ...new Set(crops.map((c) => c.category).filter(Boolean))
    ],
    [crops]
  );

  const results = useMemo(
    () =>
      crops.filter((c) => {
        const text =
          `${c.name} ${c.category} ${c.season} ${c.description}`.toLowerCase();

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
          <a href="#services">Services</a>
        </nav>

        <div className="farmer-user">
          <span className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <span>{user.name}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
      </header>

      <main className="farmer-content">
        <section className="farmer-hero">
          <div className="farmer-hero-copy">
            <span className="welcome-tag">YOUR FARM. YOUR FUTURE.</span>
            <h1>Good to see you, {user.name.split(" ")[0]}.</h1>
            <p>
              Find the information you need to make confident decisions
              for your farm.
            </p>
            <a className="hero-cta" href="#crop-finder">
              Explore crop guides <span>→</span>
            </a>
          </div>
          <div className="hero-illustration">
            🌾<span>☀️</span><i>🌱</i>
          </div>
        </section>

        <section className="farmer-stat-row">
          <article>
            <span>🌱</span>
            <div><b>{crops.length}</b><small>Crop guides</small></div>
          </article>
          <article>
            <span>₹</span>
            <div><b>{prices.length}</b><small>Market records</small></div>
          </article>
          <article>
            <span>🏛️</span>
            <div><b>{schemes.length}</b><small>Farmer schemes</small></div>
          </article>
          <article>
            <span>🔔</span>
            <div><b>{alerts.length}</b><small>Active updates</small></div>
          </article>
        </section>

        <section className="farmer-section" id="crop-finder">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CROP DISCOVERY</span>
              <h2>What are you planning to grow?</h2>
              <p>
                Search the crop library published by your Farm Connect
                administrator.
              </p>
            </div>
          </div>

          <div className="crop-finder">
            <span>⌕</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search crops by name, season or category..."
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
            {categories.map((c) => (
              <button
                key={c}
                className={
                  category === c ? "filter-chip selected" : "filter-chip"
                }
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {results.length ? (
            <div className="farmer-crop-grid">
              {results.map((crop) => (
                <article className="farmer-crop-card" key={crop.id}>
                  <div className="crop-card-top">
                    <span>🌿</span>
                    <small>{crop.category || "Crop guide"}</small>
                  </div>
                  <h3>{crop.name}</h3>
                  <p>{crop.description}</p>
                  <div className="crop-season">
                    Growing season <b>{crop.season}</b>
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
                  ? "Try another crop name or clear the filters."
                  : "Crop guides added by the administrator will appear here."}
              </p>
            </div>
          )}
        </section>

        <section className="farmer-section" id="market">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LATEST INFORMATION</span>
              <h2>Market price updates</h2>
              <p>
                Price records shared by your administrator. Check the
                date and market before making decisions.
              </p>
            </div>
            <Link to="/market-prices">View page →</Link>
          </div>

          <div className="farmer-info-grid">
            {prices.slice(-3).reverse().map((p) => (
              <article className="info-card" key={p.id}>
                <span className="info-icon">₹</span>
                <h3>{p.crop}</h3>
                <p>{p.market}</p>
                <strong>₹{p.price} <small>/ quintal</small></strong>
                <small>{p.date}</small>
              </article>
            ))}

            {!prices.length && (
              <div className="empty-state compact">
                Market price updates will appear here when published.
              </div>
            )}
          </div>
        </section>

        <section className="farmer-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">STAY INFORMED</span>
              <h2>Announcements & support</h2>
            </div>
          </div>

          <div className="farmer-info-grid">
            <article className="info-card">
              <span className="info-icon">🔔</span>
              <h3>Farmer alerts</h3>
              <p>
                {alerts.length
                  ? `${alerts.length} announcements available`
                  : "No new announcements yet."}
              </p>
              <Link to="/farmer-alerts">Read alerts →</Link>
            </article>

            <article className="info-card">
              <span className="info-icon">🏛️</span>
              <h3>Government schemes</h3>
              <p>
                {schemes.length
                  ? `${schemes.length} resources published`
                  : "Scheme information will appear here."}
              </p>
              <Link to="/government-schemes">Explore schemes →</Link>
            </article>

            <article className="info-card">
              <span className="info-icon">👨‍🌾</span>
              <h3>Expert help</h3>
              <p>Explore guidance for common farming questions.</p>
              <Link to="/expert-help">Get guidance →</Link>
            </article>
          </div>
        </section>

        <section className="farmer-section" id="services">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FARM CONNECT TOOLS</span>
              <h2>Explore all services</h2>
            </div>
          </div>

          <div className="service-grid">
            {services.map(([icon, title, path, desc]) => (
              <Link to={path} className="service-tile" key={path}>
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
          © 2026 Farm Connect · Practical agricultural information for
          your next growing season.
        </footer>
      </main>
    </div>
  );
}