
import { Link } from "react-router-dom";

function MarketPrices() {

  const crops = [
    {
      name: "🌾 Rice",
      description: "Market information for rice.",
      alert: "Rice market information selected"
    },
    {
      name: "🌽 Maize",
      description: "Market information for maize.",
      alert: "Maize market information selected"
    },
    {
      name: "🌱 Cotton",
      description: "Market information for cotton.",
      alert: "Cotton market information selected"
    },
    {
      name: "🥜 Groundnut",
      description: "Market information for groundnut.",
      alert: "Groundnut market information selected"
    }
  ];

  return (
    <div className="container">

      {/* HEADER */}

      <header className="header">

        <div className="logo">

          <img
            src="/logo.jpeg"
            alt="Farm Connect Logo"
          />

          <div>
            <h2>Farm Connect</h2>
            <small>Farmer Friendly Portal</small>
          </div>

        </div>

        <div className="search">

          <input
            type="text"
            id="searchInput"
            placeholder="Search..."
          />

          <button id="searchBtn">
            Search
          </button>

        </div>

        <div className="account">

          <Link to="/login">Login</Link>

          <Link to="/register">Register</Link>

        </div>

      </header>


      {/* CATEGORY MENU */}

      <nav className="categories">

        <Link to="/">Home</Link>

        <Link to="/crop-guide">Crop Guide</Link>

        <Link to="/market-prices">Market Prices</Link>

        <Link to="/government-schemes">
          Government Schemes
        </Link>

        <Link to="/weather">Weather</Link>

        <Link to="/expert-help">Expert Help</Link>

      </nav>


      {/* MARKET PRICES */}

      <section className="dashboard">

        <h1>💰 Market Prices</h1>

        <p>
          View sample agricultural market price information.
        </p>


        <div className="dashboard-grid">

          {crops.map((crop, index) => (

            <div className="dashboard-card" key={index}>

              <h3>{crop.name}</h3>

              <p>
                {crop.description}
              </p>

              <button
                onClick={() => alert(crop.alert)}
              >
                View Price
              </button>

            </div>

          ))}

        </div>


        <br />

        <Link to="/">
          <button>
            ← Back to Home
          </button>
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <h3>Farm Connect</h3>

        <p>
          Farmer Friendly Portal for useful agricultural information.
        </p>

        <p>
          Copyright © 2026 FarmConnect
        </p>

      </footer>

    </div>
  );
}

export default MarketPrices;
