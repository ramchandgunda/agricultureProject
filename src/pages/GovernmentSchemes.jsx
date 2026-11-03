
import { Link } from "react-router-dom";

function GovernmentSchemes() {

  const schemes = [
    {
      title: "Farmer Support",
      description:
        "Information about financial and agricultural support available to farmers."
    },
    {
      title: "Crop Insurance",
      description:
        "Information about crop insurance and protection against farming-related risks."
    },
    {
      title: "Agricultural Support",
      description:
        "Information about agricultural development programs and support."
    },
    {
      title: "Farmer Benefits",
      description:
        "Explore information about benefits and services available for farmers."
    }
  ];

  const handleLearnMore = (title) => {
    alert(title + " selected");
  };

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


      {/* GOVERNMENT SCHEMES */}

      <section className="dashboard">

        <h1>🏛️ Government Schemes</h1>

        <p>
          Explore information about government support and
          agricultural schemes for farmers.
        </p>


        <div className="dashboard-grid">

          {schemes.map((scheme, index) => (

            <div className="dashboard-card" key={index}>

              <h3>{scheme.title}</h3>

              <p>
                {scheme.description}
              </p>

              <button
                onClick={() => handleLearnMore(scheme.title)}
              >
                Learn More
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

export default GovernmentSchemes;
