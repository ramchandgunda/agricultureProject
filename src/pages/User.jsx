import { getCurrentUser, logoutUser } from "../auth";
import { Link, useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user || user.role !== "user") {
    navigate("/login");
    return null;
  }

  const modules = [
    ["Crop Guide", "/crop-guide"],
    ["Fertilizers", "/fertilizers"],
    ["Market Prices", "/market-prices"],
    ["Government Schemes", "/government-schemes"],
    ["Weather", "/weather"],
    ["Farmer Alerts", "/farmer-alerts"],
    ["Farmer Community", "/farmer-community"],
    ["Expert Help", "/expert-help"]
  ];

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <p>Welcome to your Farmer Dashboard.</p>

      <div className="dashboard-grid">
        {modules.map(([name, path]) => (
          <div className="dashboard-card" key={name}>
            <h3>{name}</h3>
            <Link to={path}>
              <button>Explore</button>
            </Link>
          </div>
        ))}
      </div>

      <button onClick={() => {
        logoutUser();
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}

export default User;