
import { Link } from "react-router-dom";

function Weather() {

  const weatherUpdates = [
    {
      icon: "☀️",
      title: "Sunny",
      description:
        "Suitable weather information for planning outdoor farming activities."
    },
    {
      icon: "🌧️",
      title: "Rain",
      description:
        "Rain information can help farmers plan irrigation and field activities."
    },
    {
      icon: "🌡️",
      title: "Temperature",
      description:
        "Temperature information can help farmers monitor crop conditions."
    },
    {
      icon: "💨",
      title: "Wind",
      description:
        "Wind conditions can be useful when planning agricultural activities."
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


      {/* WEATHER UPDATES */}

      <section className="dashboard">

        <h1>🌦️ Weather Updates</h1>

        <p>
          Weather information can help farmers plan agricultural
          activities.
        </p>


        <div className="dashboard-grid">

          {weatherUpdates.map((weather, index) => (

            <div className="dashboard-card" key={index}>

              <h3>
                {weather.icon} {weather.title}
              </h3>

              <p>
                {weather.description}
              </p>

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

export default Weather;
