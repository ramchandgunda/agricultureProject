
import { Link } from "react-router-dom";

function FarmerAlerts() {

  const alerts = [
    {
      icon: "🌦️",
      title: "Weather Alerts",
      description:
        "Stay informed about changing weather conditions that may affect farming activities.",
      advice:
        "Check reliable weather information before important farm activities."
    },
    {
      icon: "🌧️",
      title: "Heavy Rain Alert",
      description:
        "Heavy rainfall can affect crops, soil and agricultural fields.",
      advice:
        "Ensure proper drainage and protect harvested produce from excess moisture."
    },
    {
      icon: "🐛",
      title: "Pest Alert",
      description:
        "Regularly observe crops for unusual insects, leaf damage or other signs of pest activity.",
      advice:
        "Seek expert guidance before using pest-control products."
    },
    {
      icon: "🌿",
      title: "Crop Disease Alert",
      description:
        "Early identification of crop diseases can help farmers take appropriate action.",
      advice:
        "Consult an agricultural expert when unusual symptoms appear."
    },
    {
      icon: "📈",
      title: "Market Alert",
      description:
        "Keep track of important changes in crop markets before deciding when and where to sell produce.",
      advice:
        "Compare reliable market information before selling."
    },
    {
      icon: "🏛️",
      title: "Government Scheme Alert",
      description:
        "Stay informed about agricultural schemes, support programs and application opportunities.",
      advice:
        "Verify scheme information through official government sources."
    },
    {
      icon: "💧",
      title: "Water Management Alert",
      description:
        "Proper water management is important for healthy crop growth and efficient farming.",
      advice:
        "Avoid unnecessary irrigation and monitor soil moisture."
    },
    {
      icon: "⚠️",
      title: "Farm Safety Alert",
      description:
        "Farmers should take appropriate safety precautions while using equipment and working in the field.",
      advice:
        "Follow equipment safety instructions and use appropriate protective equipment."
    }
  ];

  const importantAlerts = [
    "🌦️ Check reliable weather information before field activities.",
    "🐛 Monitor crops regularly for pests and diseases.",
    "💧 Manage irrigation carefully according to crop needs.",
    "📈 Check reliable market information before selling produce.",
    "🏛️ Verify government scheme information through official sources."
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

        <h2>📢 FARMER ALERTS</h2>

        <p>
          Important agricultural updates and useful alerts for farmers.
        </p>

      </section>


      {/* ALERT CARDS */}

      <section className="products">

        {alerts.map((alert, index) => (

          <div className="product" key={index}>

            <div className="card-icon">
              {alert.icon}
            </div>

            <h3>
              {alert.title}
            </h3>

            <p>
              {alert.description}
            </p>

            <p>
              <b>Advice:</b> {alert.advice}
            </p>

          </div>

        ))}

      </section>


      {/* IMPORTANT ALERTS */}

      <section className="offers">

        <h2>📢 Important Farmer Alerts</h2>

        {importantAlerts.map((item, index) => (

          <p key={index}>
            {item}
          </p>

        ))}

      </section>


      {/* FARMER SAFETY TIP */}

      <section className="offers">

        <h2>💡 Farmer Safety Tip</h2>

        <p>
          Always verify important agricultural alerts and
          announcements using reliable or official sources
          before taking major farming decisions.
        </p>

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

export default FarmerAlerts;
