
import { useState } from "react";
import {
  getCurrentUser,
  getRegisteredFarmers,
  deleteFarmer,
  logoutUser
} from "../auth";
import { useNavigate, Navigate } from "react-router-dom";
import "./Dashboard.css";

const readData = (key) =>
  JSON.parse(localStorage.getItem(key) || "[]");

function Admin() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [section, setSection] = useState("dashboard");
  const [farmers, setFarmers] = useState(getRegisteredFarmers());

  const [crops, setCrops] = useState(() => readData("farmCrops"));
  const [prices, setPrices] = useState(() => readData("marketPrices"));
  const [schemes, setSchemes] = useState(() => readData("farmSchemes"));
  const [alerts, setAlerts] = useState(() => readData("farmAlerts"));
  const [queries, setQueries] = useState(() => readData("expertQueries"));

  const [editId, setEditId] = useState(null);

  const emptyForm = {
    name: "", category: "", season: "", price: "",
    crop: "", market: "", date: "",
    title: "", description: "", eligibility: "",
    message: "", reply: ""
  };

  const [form, setForm] = useState(emptyForm);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const menus = [
    ["dashboard", "Dashboard", "layout-dashboard"],
    ["farmers", "Manage Farmers", "users"],
    ["crops", "Manage Crops", "sprout"],
    ["prices", "Market Prices", "indian-rupee"],
    ["schemes", "Government Schemes", "landmark"],
    ["alerts", "Farmer Alerts", "bell"],
    ["reports", "Dashboard Reports", "chart-no-axes-column-increasing"],
    ["queries", "Expert Queries", "messages-square"]
  ];

  function save(key, data, setter) {
    localStorage.setItem(key, JSON.stringify(data));
    setter(data);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditId(null);
  }

  function openSection(name) {
    setSection(name);
    resetForm();

    if (name === "farmers") {
      setFarmers(getRegisteredFarmers());
    }
  }

  function submitRecord(e) {
    e.preventDefault();

    const configs = {
      crops: {
        key: "farmCrops", setter: setCrops,
        numberFields: ["price"]
      },
      prices: {
        key: "marketPrices", setter: setPrices,
        numberFields: ["price"]
      },
      schemes: {
        key: "farmSchemes", setter: setSchemes,
        numberFields: []
      },
      alerts: {
        key: "farmAlerts", setter: setAlerts,
        numberFields: []
      }
    };

    const config = configs[section];
    if (!config) return;

    const oldData = {
      crops, prices, schemes, alerts
    }[section];

    const record = { ...form };

    config.numberFields.forEach((field) => {
      record[field] = Number(record[field]);
    });

    let updated;

    if (editId !== null) {
      updated = oldData.map(item =>
        item.id === editId ? { ...item, ...record } : item
      );
    } else {
      updated = [...oldData, {
        id: Date.now(),
        ...record
      }];
    }

    save(config.key, updated, config.setter);
    alert(editId !== null ? "Record updated!" : "Record added!");
    resetForm();
  }

  function editRecord(item) {
    setForm({ ...emptyForm, ...item });
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function removeRecord(id) {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    const configs = {
      crops: ["farmCrops", crops, setCrops],
      prices: ["marketPrices", prices, setPrices],
      schemes: ["farmSchemes", schemes, setSchemes],
      alerts: ["farmAlerts", alerts, setAlerts]
    };

    const [key, data, setter] = configs[section];
    save(key, data.filter(item => item.id !== id), setter);

    if (editId === id) resetForm();
  }

  function removeFarmer(email) {
    if (window.confirm("Delete this farmer account?")) {
      setFarmers(deleteFarmer(email));
    }
  }

  function replyToQuery(id) {
    const updated = queries.map(q =>
      q.id === id
        ? { ...q, reply: form.reply, status: "Answered" }
        : q
    );

    save("expertQueries", updated, setQueries);
    resetForm();
    alert("Reply sent successfully!");
  }

  function logout() {
    logoutUser();
    navigate("/login");
  }

  function renderForm(title, fields) {
    return (
      <form className="management-form" onSubmit={submitRecord}>
        <h3>{editId !== null ? "Edit " + title : "Add " + title}</h3>

        {fields.map(field => (
          <div key={field.name} className="form-group">
            <label>{field.label}</label>
            {field.options ? (
              <select
                value={form[field.name]}
                onChange={e => setForm({
                  ...form, [field.name]: e.target.value
                })}
                required
              >
                <option value="">Select {field.label}</option>
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : field.multiline ? (
              <textarea
                placeholder={field.label}
                value={form[field.name]}
                onChange={e => setForm({
                  ...form, [field.name]: e.target.value
                })}
                required
              />
            ) : (
              <input
                type={field.type || "text"}
                placeholder={field.label}
                min={field.type === "number" ? "0" : undefined}
                value={form[field.name]}
                onChange={e => setForm({
                  ...form, [field.name]: e.target.value
                })}
                required
              />
            )}
          </div>
        ))}

        <div className="form-actions">
          <button className="primary-btn" type="submit">
            {editId !== null ? "Update" : "Add"} {title}
          </button>
          {editId !== null && (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }

  function renderTable(title, data, columns) {
    return (
      <div className="table-section">
        <h3>{title} ({data.length})</h3>

        {data.length === 0 ? (
          <p className="empty-message">No records available yet.</p>
        ) : (
          <div className="table-scroll">
            <table className="management-table">
              <thead>
                <tr>
                  {columns.map(c => <th key={c.key}>{c.label}</th>)}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.id}>
                    {columns.map(c => (
                      <td key={c.key}>
                        {c.key === "price"
                          ? "₹" + Number(item[c.key]).toLocaleString("en-IN")
                          : item[c.key] || "-"}
                      </td>
                    ))}
                    <td className="action-cell">
                      <button className="edit-btn" onClick={() => editRecord(item)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => removeRecord(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  const titles = {
    farmers: "Manage Farmers",
    crops: "Manage Crops",
    prices: "Manage Market Prices",
    schemes: "Government Schemes",
    alerts: "Farmer Alerts",
    reports: "Dashboard Reports",
    queries: "Expert Queries"
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span>🌱</span>
          <div>
            <h2>Farm Connect</h2>
            <small>Admin Panel</small>
          </div>
        </div>

        <nav>
          {menus.map(([id, label, icon]) => (
            <button
              key={id}
              className={section === id ? "sidebar-link active" : "sidebar-link"}
              onClick={() => openSection(id)}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={logout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>{section === "dashboard" ? "Admin Dashboard" : titles[section]}</h1>
            <p>Welcome back, {user.name || "Administrator"}!</p>
          </div>
          <span className="admin-avatar">A</span>
        </header>

        {section === "dashboard" && (
          <>
            <div className="welcome-panel">
              <h2>Growing Together, Growing Better 🌾</h2>
              <p>Manage farmers, agricultural information and services from one place.</p>
            </div>

            <div className="stats-grid">
              {[
                ["Registered Farmers", farmers.length],
                ["Available Crops", crops.length],
                ["Market Prices", prices.length],
                ["Government Schemes", schemes.length],
                ["Farmer Alerts", alerts.length],
                ["Expert Queries", queries.length]
              ].map(([label, value]) => (
                <div className="stat-card" key={label}>
                  <p>{label}</p>
                  <h2>{value}</h2>
                </div>
              ))}
            </div>

            <h2 className="section-heading">Management Features</h2>
            <div className="feature-grid">
              {menus.slice(1).map(([id, label]) => (
                <button className="feature-card" key={id} onClick={() => openSection(id)}>
                  <span className="feature-icon">🌿</span>
                  <h3>{label}</h3>
                  <p>Open and manage {label.toLowerCase()}.</p>
                  <span className="feature-action">Manage →</span>
                </button>
              ))}
            </div>
          </>
        )}

        {section === "farmers" && (
          <>
            <p className="section-description">View and manage registered farmer accounts.</p>
            <div className="table-section">
              <h3>Registered Farmers ({farmers.length})</h3>
              <div className="table-scroll">
                <table className="management-table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Mobile</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {farmers.map(f => (
                      <tr key={f.email}>
                        <td>{f.name}</td>
                        <td>{f.email}</td>
                        <td>{f.mobile || "-"}</td>
                        <td>
                          <button className="delete-btn" onClick={() => removeFarmer(f.email)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {section === "crops" && (
          <>
            {renderForm("Crop", [
              { name: "name", label: "Crop Name" },
              { name: "category", label: "Category", options: ["Food Crop", "Cash Crop", "Horticulture", "Plantation Crop"] },
              { name: "season", label: "Season", options: ["Kharif", "Rabi", "Zaid", "All Seasons"] },
              { name: "price", label: "Price per Quintal (₹)", type: "number" }
            ])}
            {renderTable("Crop List", crops, [
              { key: "name", label: "Crop" },
              { key: "category", label: "Category" },
              { key: "season", label: "Season" },
              { key: "price", label: "Price/Quintal" }
            ])}
          </>
        )}

        {section === "prices" && (
          <>
            {renderForm("Market Price", [
              { name: "crop", label: "Crop Name" },
              { name: "market", label: "Market / Location" },
              { name: "price", label: "Price per Quintal (₹)", type: "number" },
              { name: "date", label: "Price Date", type: "date" }
            ])}
            {renderTable("Market Price List", prices, [
              { key: "crop", label: "Crop" },
              { key: "market", label: "Market" },
              { key: "price", label: "Price/Quintal" },
              { key: "date", label: "Date" }
            ])}
          </>
        )}

        {section === "schemes" && (
          <>
            {renderForm("Scheme", [
              { name: "title", label: "Scheme Name" },
              { name: "description", label: "Scheme Description", multiline: true },
              { name: "eligibility", label: "Eligibility Details", multiline: true }
            ])}
            {renderTable("Government Schemes", schemes, [
              { key: "title", label: "Scheme" },
              { key: "description", label: "Description" },
              { key: "eligibility", label: "Eligibility" }
            ])}
          </>
        )}

        {section === "alerts" && (
          <>
            {renderForm("Alert", [
              { name: "title", label: "Alert Title" },
              { name: "message", label: "Announcement Message", multiline: true },
              { name: "date", label: "Date", type: "date" }
            ])}
            {renderTable("Published Alerts", alerts, [
              { key: "title", label: "Title" },
              { key: "message", label: "Message" },
              { key: "date", label: "Date" }
            ])}
          </>
        )}

        {section === "reports" && (
          <div className="stats-grid reports-grid">
            {[
              ["Total Farmers", farmers.length],
              ["Total Crops", crops.length],
              ["Market Price Records", prices.length],
              ["Government Schemes", schemes.length],
              ["Published Alerts", alerts.length],
              ["Expert Queries", queries.length],
              ["Answered Queries", queries.filter(q => q.status === "Answered").length],
              ["Pending Queries", queries.filter(q => q.status !== "Answered").length]
            ].map(([label, value]) => (
              <div className="stat-card" key={label}>
                <p>{label}</p>
                <h2>{value}</h2>
              </div>
            ))}
          </div>
        )}

        {section === "queries" && (
          <div className="table-section">
            <h3>Farmer Questions ({queries.length})</h3>
            {queries.length === 0 ? (
              <p className="empty-message">No expert queries submitted yet.</p>
            ) : (
              queries.map(q => (
                <div className="query-card" key={q.id}>
                  <h3>{q.subject}</h3>
                  <p><b>Farmer:</b> {q.farmer}</p>
                  <p>{q.message}</p>
                  <p><b>Status:</b> {q.status || "Pending"}</p>
                  {q.reply && <p><b>Previous Reply:</b> {q.reply}</p>}
                  <form onSubmit={e => {
                    e.preventDefault();
                    replyToQuery(q.id);
                  }}>
                    <textarea
                      placeholder="Write your reply"
                      value={form.reply}
                      onChange={e => setForm({ ...form, reply: e.target.value })}
                      required
                    />
                    <button className="primary-btn">Send Reply</button>
                  </form>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin;
