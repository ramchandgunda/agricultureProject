
import { Link } from "react-router-dom";

function Home() {
  const services = [
    ["🌱", "Crop Guide", "/crop-guide", "Learn about crops and cultivation."],
    ["💰", "Market Prices", "/market-prices", "Explore agricultural market information."],
    ["🏛️", "Government Schemes", "/government-schemes", "Discover farmer support schemes."],
    ["🌦️", "Weather Updates", "/weather", "Explore weather information for farming."],
    ["👨‍🌾", "Expert Help", "/expert-help", "Get agricultural guidance and support."],
    ["🧪", "Fertilizers", "/fertilizers", "Learn about fertilizers and crop nutrients."],
    ["🔔", "Farmer Alerts", "/farmer-alerts", "Read important farming alerts."],
    ["🤝", "Farmer Community", "/farmer-community", "Connect and share farming knowledge."]
  ];

  return (
    <div className="container">

      <header className="header">
        <div className="logo">
          <img src="/logo.jpeg" alt="Farm Connect Logo" />
          <div>
            <h2>Farm Connect</h2>
            <small>Farmer Friendly Portal</small>
          </div>
        </div>

        <div className="account">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>

      <nav className="categories">
        <Link to="/">Home</Link>
        <Link to="/crop-guide">Crop Guide</Link>
        <Link to="/market-prices">Market Prices</Link>
        <Link to="/government-schemes">Government Schemes</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/expert-help">Expert Help</Link>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Grow Better. Farm Smarter. Live Better.</h1>
          <p>
            Welcome to Farm Connect! Your one-stop platform for
            crop guidance, weather information, market updates
            and agricultural support.
          </p>
          <Link to="/crop-guide">
            <button>Explore Crop Guide →</button>
          </Link>
        </div>
      </section>

      <section className="dashboard">
        <h1>Our Agriculture Services</h1>
        <p>Everything farmers need, all in one place.</p>

        <div className="dashboard-grid">
          {services.map((service) => (
            <div className="dashboard-card" key={service[2]}>
              <div className="card-icon">{service[0]}</div>
              <h3>{service[1]}</h3>
              <p>{service[3]}</p>
              <Link to={service[2]}>
                <button>Explore More →</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="offers">
        <h2>🌿 Why Choose Farm Connect?</h2>
        <p>✔ Easy access to agricultural information</p>
        <p>✔ Helpful crop and fertilizer guidance</p>
        <p>✔ Farmer support and community resources</p>
        <p>✔ Simple and farmer-friendly design</p>
      </section>

      <footer className="footer">
        <h2>Farm Connect</h2>
        <p>Your farming companion for a better tomorrow.</p>
        <p>Copyright © 2026 FarmConnect</p>
      </footer>

    </div>
  );
}

export default Home;
