
import { Link } from "react-router-dom";

function CropGuide() {

  const crops = [
    {
      icon: "🌾",
      name: "Rice",
      soil: "Clay or loamy soil.",
      sowing: "Suitable during the rainy season.",
      water: "Requires regular water supply.",
      care: "Control weeds and monitor pests.",
      harvest: "Harvest when grains become mature."
    },
    {
      icon: "🌽",
      name: "Maize",
      soil: "Well-drained fertile soil.",
      sowing: "Can be grown in suitable seasonal conditions.",
      water: "Regular irrigation is important.",
      care: "Remove weeds and monitor crop growth.",
      harvest: "Harvest when the cobs are mature."
    },
    {
      icon: "🌿",
      name: "Cotton",
      soil: "Well-drained black or loamy soil.",
      sowing: "Follow the suitable local sowing season.",
      water: "Avoid excessive waterlogging.",
      care: "Monitor pests and maintain field cleanliness.",
      harvest: "Pick mature cotton bolls."
    },
    {
      icon: "🥜",
      name: "Groundnut",
      soil: "Loose and well-drained soil.",
      sowing: "Follow the appropriate local season.",
      water: "Maintain proper moisture without waterlogging.",
      care: "Control weeds and monitor crop health.",
      harvest: "Harvest when pods are sufficiently mature."
    }
  ];

  const guidance = [
    "🌱 Select crops according to soil and local climate conditions.",
    "💧 Provide appropriate irrigation according to crop requirements.",
    "🌿 Remove weeds regularly to reduce competition for nutrients.",
    "🐛 Regularly check crops for pests and diseases.",
    "🌾 Harvest crops at the appropriate maturity stage."
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


      {/* MENU */}

      <nav className="categories">

        <Link to="/">Home</Link>

        <Link to="/crop-guide">Crop Guide</Link>

        <Link to="/market-prices">Market Prices</Link>

        <Link to="/government-schemes">Government Schemes</Link>

        <Link to="/weather">Weather</Link>

        <Link to="/expert-help">Expert Help</Link>

      </nav>


      {/* PAGE TITLE */}

      <section className="product-title">

        <h2>🌱 CROP GUIDE</h2>

        <p>
          Useful crop information and basic farming guidance
        </p>

      </section>


      {/* CROP INFORMATION */}

      <section className="products">

        {crops.map((crop, index) => (

          <div className="product" key={index}>

            <div className="card-icon">
              {crop.icon}
            </div>

            <h3>{crop.name}</h3>

            <p>
              <b>Soil:</b> {crop.soil}
            </p>

            <p>
              <b>Sowing:</b> {crop.sowing}
            </p>

            <p>
              <b>Water:</b> {crop.water}
            </p>

            <p>
              <b>Care:</b> {crop.care}
            </p>

            <p>
              <b>Harvest:</b> {crop.harvest}
            </p>

          </div>

        ))}

      </section>


      {/* GENERAL GUIDANCE */}

      <section className="offers">

        <h2>🌱 General Crop Guidance</h2>

        {guidance.map((item, index) => (

          <p key={index}>
            {item}
          </p>

        ))}

      </section>


      {/* BACK BUTTON */}

      <section className="product-title">

        <Link to="/">
          <button>← Back to Home</button>
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

export default CropGuide;
