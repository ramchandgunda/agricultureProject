
import { Link } from "react-router-dom";

function Fertilizers() {

  const fertilizers = [
    {
      icon: "🌱",
      name: "Urea",
      description:
        "Urea is a nitrogen fertilizer commonly used to provide nitrogen to crops.",
      nutrient: "Nitrogen",
      purpose:
        "Supports healthy plant growth when nitrogen is required."
    },
    {
      icon: "🌾",
      name: "DAP",
      description:
        "DAP is a fertilizer that provides important nutrients for crop growth and development.",
      nutrient: "Nitrogen & Phosphorus",
      purpose:
        "Provides nutrients required for crop development."
    },
    {
      icon: "🌿",
      name: "MOP",
      description:
        "MOP is a potassium fertilizer used as a source of potassium for crops.",
      nutrient: "Potassium",
      purpose:
        "Provides potassium where required by the crop and soil."
    },
    {
      icon: "🧪",
      name: "NPK Fertilizers",
      description:
        "NPK fertilizers provide a combination of nitrogen, phosphorus and potassium.",
      nutrient: "Nitrogen, Phosphorus & Potassium",
      purpose:
        "Provides multiple essential nutrients according to crop requirements."
    },
    {
      icon: "♻️",
      name: "Organic Manure",
      description:
        "Organic manure adds organic matter to the soil and supports healthy soil management.",
      nutrient: "Soil improvement",
      purpose:
        "Examples: Compost and farmyard manure."
    },
    {
      icon: "🔬",
      name: "Micronutrients",
      description:
        "Micronutrients are required by plants in smaller quantities for healthy growth.",
      nutrient: "Zinc, Iron & Boron",
      purpose:
        "Support plant growth and development."
    },
    {
      icon: "🧪",
      name: "Soil Testing",
      description:
        "Soil testing helps identify soil properties and possible nutrient requirements.",
      nutrient: "Better nutrient management",
      purpose:
        "Helps make informed fertilizer decisions."
    },
    {
      icon: "👨‍🌾",
      name: "Expert Guidance",
      description:
        "Farmers can consult qualified agricultural experts for crop and soil-specific advice.",
      nutrient: "Agricultural guidance",
      purpose:
        "Follow local agricultural guidance for fertilizer selection."
    }
  ];

  const tips = [
    "🌱 Check the crop and soil requirements.",
    "🧪 Consider soil testing before selecting nutrients.",
    "📋 Read the fertilizer label carefully.",
    "👨‍🌾 Consult a qualified agricultural expert when required."
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


      {/* PAGE TITLE */}

      <section className="product-title">

        <h2>FERTILIZERS & CROP INPUTS</h2>

        <p>
          Learn about common fertilizers, crop nutrients and useful
          agricultural inputs.
        </p>

      </section>


      {/* FERTILIZER INFORMATION */}

      <section className="products">

        {fertilizers.map((item, index) => (

          <div className="product" key={index}>

            <div className="card-icon">
              {item.icon}
            </div>

            <h3>{item.name}</h3>

            <p>
              {item.description}
            </p>

            <p>
              <b>
                {index === 4 || index === 6 || index === 7
                  ? "Purpose:"
                  : index === 5
                    ? "Examples:"
                    : "Main Nutrient:"}
              </b>{" "}
              {item.nutrient}
            </p>

            <p>
              <b>
                {index === 4 || index === 6 || index === 7
                  ? "Benefit:"
                  : "Purpose:"}
              </b>{" "}
              {item.purpose}
            </p>

          </div>

        ))}

      </section>


      {/* IMPORTANT TIPS */}

      <section className="offers">

        <h2>Fertilizer Selection Tips</h2>

        {tips.map((tip, index) => (

          <p key={index}>
            {tip}
          </p>

        ))}

      </section>


      {/* BACK TO HOME */}

      <section className="services">

        <div>

          <h3>Farm Connect</h3>

          <p>
            Useful agricultural information in one place.
          </p>

          <Link to="/">
            <button>
              Back to Home
            </button>
          </Link>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <h2>FarmConnect</h2>

        <p>
          Home | Crop Guide | Market Prices |
          Government Schemes | Weather | Expert Help
        </p>

        <p>
          Copyright © 2026 FarmConnect
        </p>

      </footer>

    </div>
  );
}

export default Fertilizers;
