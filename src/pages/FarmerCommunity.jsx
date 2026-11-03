
import { Link } from "react-router-dom";

function FarmerCommunity() {

  const community = [
    {
      icon: "💬",
      title: "Farming Discussions",
      description:
        "Farmers can discuss common farming topics, crop problems and useful agricultural practices.",
      benefit:
        "Share experiences and learn from others."
    },
    {
      icon: "🌾",
      title: "Crop Experiences",
      description:
        "Farmers can share their experiences about growing different crops and managing fields.",
      benefit:
        "Learn practical ideas from other farmers."
    },
    {
      icon: "💡",
      title: "Farming Tips",
      description:
        "Discover useful tips related to crop care, irrigation, soil management and farm activities.",
      benefit:
        "Improve knowledge about farming practices."
    },
    {
      icon: "❓",
      title: "Share Farm Problems",
      description:
        "Farmers can describe common problems related to crops, soil, pests or farming activities.",
      benefit:
        "Find useful suggestions and information."
    },
    {
      icon: "📚",
      title: "Farmer Knowledge",
      description:
        "Access useful agricultural knowledge and learn about different farming methods.",
      benefit:
        "Increase agricultural awareness."
    },
    {
      icon: "👨‍🌾",
      title: "Farmer Connections",
      description:
        "Build connections with other farmers and exchange useful agricultural information.",
      benefit:
        "Encourages knowledge sharing."
    },
    {
      icon: "⭐",
      title: "Farmer Success Stories",
      description:
        "Learn from successful farming experiences, new ideas and improved farming practices.",
      benefit:
        "Provides useful learning examples."
    },
    {
      icon: "📖",
      title: "Agricultural Resources",
      description:
        "Find useful agricultural resources related to crops, technology, schemes and farming.",
      benefit:
        "Keeps useful information in one place."
    }
  ];

  const guidelines = [
    "🌱 Share useful and respectful agricultural information.",
    "💬 Discuss farming problems and experiences politely.",
    "📚 Share reliable information whenever possible.",
    "👨‍🌾 Respect the experiences and opinions of other farmers.",
    "⚠️ For serious crop or disease problems, consult a qualified agricultural expert."
  ];

  const benefits = [
    "🤝 Encourages knowledge sharing between farmers.",
    "💡 Helps farmers discover new ideas and practices.",
    "📚 Provides access to useful agricultural information.",
    "🌱 Supports better farming awareness."
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


      {/* NAVIGATION */}

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


      {/* PAGE TITLE */}

      <section className="product-title">

        <h2>👨‍🌾 FARMER COMMUNITY</h2>

        <p>
          Connect with agricultural knowledge and share useful farming experiences.
        </p>

      </section>


      {/* COMMUNITY CARDS */}

      <section className="products">

        {community.map((item, index) => (

          <div className="product" key={index}>

            <div className="card-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>
              {item.description}
            </p>

            <p>
              <b>Benefit:</b> {item.benefit}
            </p>

          </div>

        ))}

      </section>


      {/* COMMUNITY GUIDELINES */}

      <section className="offers">

        <h2>🤝 Community Guidelines</h2>

        {guidelines.map((item, index) => (

          <p key={index}>
            {item}
          </p>

        ))}

      </section>


      {/* COMMUNITY BENEFITS */}

      <section className="offers">

        <h2>🌾 Benefits of Farmer Community</h2>

        {benefits.map((item, index) => (

          <p key={index}>
            {item}
          </p>

        ))}

      </section>


      {/* BACK BUTTON */}

      <section className="product-title">

        <Link to="/">
          <button>
            ← Back to Home
          </button>
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <h2>FarmConnect</h2>

        <p>
          Farmer-friendly agricultural information in one place.
        </p>

        <p>
          Copyright © 2026 FarmConnect
        </p>

      </footer>

    </div>
  );
}

export default FarmerCommunity;
