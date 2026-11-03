import { getCurrentUser, logoutUser } from "../auth";
import { Link, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const modules = [
    ["Manage Farmers", "/admin"],
    ["Manage Crops", "/crop-guide"],
    ["Market Prices", "/market-prices"],
    ["Government Schemes", "/government-schemes"],
    ["Farmer Alerts", "/farmer-alerts"],
    ["Dashboard Reports", "/admin"]
  ];

  return (
    <div className="dashboard">
      <h1>Welcome Admin</h1>
      <p>Farm Connect Management Dashboard</p>

      <div className="dashboard-grid">
        {modules.map(([name, path]) => (
          <div className="dashboard-card" key={name}>
            <h3>{name}</h3>
            <Link to={path}>
              <button>Manage</button>
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

export default Admin;