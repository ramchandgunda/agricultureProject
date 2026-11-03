
import { Link } from "react-router-dom";

function ExpertHelp() {

  const topics = [
    {
      icon: "🌱",
      title: "Crop Selection",
      description:
        "Learn about factors to consider when selecting crops."
    },
    {
      icon: "💧",
      title: "Irrigation",
      description:
        "Learn about basic irrigation and water management practices."
    },
    {
      icon: "🌿",
      title: "Crop Care",
      description:
        "Learn about general crop care and farming practices."
    },
    {
      icon: "📞",
      title: "Farmer Support",
      description:
        "Access support information for farming-related concerns."
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

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </div>

      </header>


      {/* NAVIGATION MENU */}

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


      {/* EXPERT HELP SECTION */}

      <section className="dashboard">

        <h1>👨‍💼 Expert Help</h1>

        <p>
          Get useful guidance for common farming-related questions.
        </p>


        {/* EXPERT HELP CARDS */}

        <div className="dashboard-grid">

          {topics.map((topic, index) => (

            <div
              className="dashboard-card"
              key={index}
            >

              <h3>
                {topic.icon} {topic.title}
              </h3>

              <p>
                {topic.description}
              </p>

              <button
                onClick={() =>
                  alert(topic.title + " Help selected")
                }
              >
                Get Help
              </button>

            </div>

          ))}

        </div>


        <br />

        {/* BACK BUTTON */}

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

export default ExpertHelp;
