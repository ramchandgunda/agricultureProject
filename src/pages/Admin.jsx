import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteFarmer,
  getCurrentUser,
  getRegisteredFarmers,
  logoutUser
} from "../auth";

const sections = [
  ["overview", "▦", "Overview"],
  ["farmers", "♙", "Farmers"],
  ["crops", "❀", "Crop library"],
  ["prices", "₹", "Market prices"],
  ["schemes", "▤", "Schemes"],
  ["alerts", "⚑", "Farmer alerts"]
];

const store = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const load = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

export default function Admin() {
  const navigate = useNavigate();
  const admin = getCurrentUser();

  const [active, setActive] = useState("overview");
  const [farmers, setFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [prices, setPrices] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({});

  function refresh() {
    setFarmers(getRegisteredFarmers());
    setCrops(load("farmCrops"));
    setPrices(load("marketPrices"));
    setSchemes(load("farmSchemes"));
    setAlerts(load("farmAlerts"));
  }

  useEffect(() => {
    if (!admin || admin.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }
    refresh();
  }, []);

  function saveRecord(key, list, setter, fields) {
    if (fields.some((f) => !String(form[f] || "").trim())) {
      setNotice("Please complete all fields.");
      return;
    }

    const next = [
      ...list,
      {
        ...form,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
    ];

    store(key, next);
    setter(next);
    setForm({});
    setNotice("Information published successfully.");
  }

  function removeRecord(key, list, setter, id) {
    const next = list.filter((item) => item.id !== id);
    store(key, next);
    setter(next);
    setNotice("Record deleted successfully.");
  }

  function removeFarmer(email) {
    if (!window.confirm(`Delete farmer account ${email}?`)) return;
    setFarmers(deleteFarmer(email));
    setNotice("Farmer account deleted.");
  }

  function signOut() {
    logoutUser();
    navigate("/login");
  }

  const filteredFarmers = useMemo(
    () =>
      farmers.filter((f) =>
        `${f.name} ${f.email}`.toLowerCase().includes(query.toLowerCase())
      ),
    [farmers, query]
  );

  if (!admin || admin.role !== "admin") return null;

  const count = crops.length + prices.length + schemes.length + alerts.length;
  const title =
    sections.find((s) => s[0] === active)?.[2] || "Overview";

  const Field = ({ name, label, type = "text", placeholder = "" }) => (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name] || ""}
        onChange={(e) =>
          setForm({ ...form, [name]: e.target.value })
        }
      />
    </label>
  );

  const TextField = ({ name, label, placeholder = "" }) => (
    <label className="field">
      <span>{label}</span>
      <textarea
        rows="3"
        placeholder={placeholder}
        value={form[name] || ""}
        onChange={(e) =>
          setForm({ ...form, [name]: e.target.value })
        }
      />
    </label>
  );

  const Table = ({ headings, rows, onDelete }) => (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headings.map((h) => (
              <th key={h}>{h}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r) => (
              <tr key={r.id || r.email}>
                {r.cells.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
                <td>
                  <button
                    className="text-danger"
                    onClick={() => onDelete(r.id || r.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headings.length + 1}
                className="empty-cell"
              >
                Nothing here yet. Add your first record.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/" className="admin-brand">
          <span className="brand-mark">🌱</span>
          <span>
            Farm<span>Connect</span>
            <small>ADMIN CONSOLE</small>
          </span>
        </Link>

        <div className="sidebar-label">WORKSPACE</div>

        <nav>
          {sections.map(([id, icon, label]) => (
            <button
              key={id}
              className={
                active === id ? "side-link active" : "side-link"
              }
              onClick={() => {
                setActive(id);
                setNotice("");
              }}
            >
              <span>{icon}</span>
              {label}
              {active === id && <i />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="admin-profile">
            <div className="avatar">A</div>
            <div>
              <b>{admin.name}</b>
              <small>Administrator</small>
            </div>
          </div>

          <button className="side-link signout" onClick={signOut}>
            ↪ <span>Sign out</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="eyebrow">FARM CONNECT / ADMIN</span>
            <h1>{title}</h1>
          </div>
          <div className="topbar-right">
            <span className="live-dot">● System ready</span>
            <div className="avatar">A</div>
          </div>
        </header>

        <section className="admin-content">
          {notice && <div className="notice">{notice}</div>}

          {active === "overview" && (
            <>
              <div className="welcome-panel">
                <div>
                  <span className="welcome-tag">
                    YOUR FARMING NETWORK
                  </span>
                  <h2>Good day, {admin.name} 👋</h2>
                  <p>
                    Here’s what’s happening across your Farm Connect
                    platform.
                  </p>
                </div>
                <div className="welcome-art">🌾</div>
              </div>

              <div className="stat-grid">
                {[
                  [
                    "Registered farmers",
                    farmers.length,
                    "♙",
                    "Accounts in your network"
                  ],
                  [
                    "Crop library",
                    crops.length,
                    "🌱",
                    "Published crop guides"
                  ],
                  [
                    "Market updates",
                    prices.length,
                    "₹",
                    "Price records shared"
                  ],
                  [
                    "Resources & alerts",
                    schemes.length + alerts.length,
                    "▤",
                    "Schemes and announcements"
                  ]
                ].map(([label, value, icon, sub]) => (
                  <article className="stat-card" key={label}>
                    <div className="stat-icon">{icon}</div>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{sub}</small>
                  </article>
                ))}
              </div>

              <div className="overview-grid">
                <section className="panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Platform activity</h3>
                      <p>Published information at a glance</p>
                    </div>
                    <span className="soft-pill">ALL TIME</span>
                  </div>

                  {[
                    ["Crop guides", crops.length],
                    ["Market prices", prices.length],
                    ["Government schemes", schemes.length],
                    ["Farmer alerts", alerts.length]
                  ].map(([label, value]) => (
                    <div className="activity-row" key={label}>
                      <span>{label}</span>
                      <div className="activity-track">
                        <i
                          style={{
                            width: `${
                              count
                                ? Math.max(
                                    4,
                                    (value / Math.max(count, 1)) * 100
                                  )
                                : 0
                            }%`
                          }}
                        />
                      </div>
                      <b>{value}</b>
                    </div>
                  ))}
                </section>

                <section className="panel quick-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Quick actions</h3>
                      <p>Manage your platform</p>
                    </div>
                  </div>

                  {sections.slice(1).map(([id, icon, label]) => (
                    <button
                      key={id}
                      className="quick-action"
                      onClick={() => setActive(id)}
                    >
                      <span>{icon}</span>
                      {label}
                      <b>→</b>
                    </button>
                  ))}
                </section>
              </div>

              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recently registered farmers</h3>
                    <p>Latest farmer accounts</p>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => setActive("farmers")}
                  >
                    View all →
                  </button>
                </div>

                <Table
                  headings={["Name", "Email", "Mobile"]}
                  rows={farmers
                    .slice(-5)
                    .reverse()
                    .map((f) => ({
                      id: f.email,
                      cells: [
                        f.name,
                        f.email,
                        f.mobile || "—"
                      ]
                    }))}
                  onDelete={removeFarmer}
                />
              </section>
            </>
          )}

          {active === "farmers" && (
            <section className="panel">
              <div className="panel-heading">
                <div>
                  <h3>Farmer accounts</h3>
                  <p>View and manage registered farmers.</p>
                </div>
                <span className="soft-pill">
                  {farmers.length} TOTAL
                </span>
              </div>

              <input
                className="search-field"
                placeholder="Search by farmer name or email..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <Table
                headings={["Farmer", "Email address", "Mobile"]}
                rows={filteredFarmers.map((f) => ({
                  id: f.email,
                  cells: [
                    f.name,
                    f.email,
                    f.mobile || "—"
                  ]
                }))}
                onDelete={removeFarmer}
              />
            </section>
          )}

          {active === "crops" && (
            <>
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Add a crop guide</h3>
                    <p>
                      Publish useful crop information for farmers.
                    </p>
                  </div>
                </div>

                <div className="form-grid">
                  <Field
                    name="name"
                    label="Crop name"
                    placeholder="e.g. Rice"
                  />
                  <Field
                    name="category"
                    label="Category"
                    placeholder="e.g. Cereal"
                  />
                  <Field
                    name="season"
                    label="Growing season"
                    placeholder="e.g. Kharif"
                  />
                </div>

                <TextField
                  name="description"
                  label="Description"
                  placeholder="Add cultivation and care information..."
                />

                <button
                  className="btn-primary"
                  onClick={() =>
                    saveRecord(
                      "farmCrops",
                      crops,
                      setCrops,
                      ["name", "category", "season", "description"]
                    )
                  }
                >
                  ＋ Publish crop guide
                </button>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h3>Published crop guides</h3>
                  <span className="soft-pill">
                    {crops.length} RECORDS
                  </span>
                </div>

                <Table
                  headings={[
                    "Crop",
                    "Category",
                    "Season",
                    "Description"
                  ]}
                  rows={crops.map((x) => ({
                    id: x.id,
                    cells: [
                      x.name,
                      x.category,
                      x.season,
                      x.description
                    ]
                  }))}
                  onDelete={(id) =>
                    removeRecord(
                      "farmCrops",
                      crops,
                      setCrops,
                      id
                    )
                  }
                />
              </section>
            </>
          )}

          {active === "prices" && (
            <>
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Add market price</h3>
                    <p>
                      Share a price record with farmers. Enter the
                      source and date where possible.
                    </p>
                  </div>
                </div>

                <div className="form-grid">
                  <Field
                    name="crop"
                    label="Crop"
                    placeholder="e.g. Tomato"
                  />
                  <Field
                    name="market"
                    label="Market / location"
                    placeholder="e.g. Guntur market"
                  />
                  <Field
                    name="price"
                    label="Price (₹ per quintal)"
                    type="number"
                    placeholder="e.g. 2400"
                  />
                  <Field
                    name="date"
                    label="Price date"
                    type="date"
                  />
                </div>

                <button
                  className="btn-primary"
                  onClick={() =>
                    saveRecord(
                      "marketPrices",
                      prices,
                      setPrices,
                      ["crop", "market", "price", "date"]
                    )
                  }
                >
                  ＋ Publish market price
                </button>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h3>Market price records</h3>
                </div>

                <Table
                  headings={["Crop", "Market", "Price", "Date"]}
                  rows={prices.map((x) => ({
                    id: x.id,
                    cells: [
                      x.crop,
                      x.market,
                      `₹${x.price}`,
                      x.date
                    ]
                  }))}
                  onDelete={(id) =>
                    removeRecord(
                      "marketPrices",
                      prices,
                      setPrices,
                      id
                    )
                  }
                />
              </section>
            </>
          )}

          {active === "schemes" && (
            <>
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Publish a government scheme</h3>
                    <p>
                      Share scheme details and an official information link.
                    </p>
                  </div>
                </div>

                <Field
                  name="name"
                  label="Scheme name"
                  placeholder="Scheme title"
                />
                <TextField
                  name="description"
                  label="Description"
                  placeholder="Eligibility, benefits and application details..."
                />
                <Field
                  name="eligibility"
                  label="Eligibility"
                  placeholder="Who can apply?"
                />
                <Field
                  name="link"
                  label="Official website link"
                  placeholder="https://..."
                />

                <button
                  className="btn-primary"
                  onClick={() =>
                    saveRecord(
                      "farmSchemes",
                      schemes,
                      setSchemes,
                      ["name", "description", "eligibility", "link"]
                    )
                  }
                >
                  ＋ Publish scheme
                </button>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h3>Published schemes</h3>
                </div>

                <Table
                  headings={["Scheme", "Eligibility", "Description"]}
                  rows={schemes.map((x) => ({
                    id: x.id,
                    cells: [
                      x.name,
                      x.eligibility,
                      x.description
                    ]
                  }))}
                  onDelete={(id) =>
                    removeRecord(
                      "farmSchemes",
                      schemes,
                      setSchemes,
                      id
                    )
                  }
                />
              </section>
            </>
          )}

          {active === "alerts" && (
            <>
              <section className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Create farmer alert</h3>
                    <p>
                      Publish an announcement visible on the farmer dashboard.
                    </p>
                  </div>
                </div>

                <Field
                  name="title"
                  label="Alert title"
                  placeholder="e.g. Heavy rainfall advisory"
                />
                <TextField
                  name="message"
                  label="Alert message"
                  placeholder="Write the announcement..."
                />
                <Field
                  name="date"
                  label="Date"
                  type="date"
                />

                <button
                  className="btn-primary"
                  onClick={() =>
                    saveRecord(
                      "farmAlerts",
                      alerts,
                      setAlerts,
                      ["title", "message", "date"]
                    )
                  }
                >
                  ＋ Publish alert
                </button>
              </section>

              <section className="panel">
                <div className="panel-heading">
                  <h3>Published alerts</h3>
                </div>

                <Table
                  headings={["Title", "Message", "Date"]}
                  rows={alerts.map((x) => ({
                    id: x.id,
                    cells: [
                      x.title,
                      x.message,
                      x.date
                    ]
                  }))}
                  onDelete={(id) =>
                    removeRecord(
                      "farmAlerts",
                      alerts,
                      setAlerts,
                      id
                    )
                  }
                />
              </section>
            </>
          )}

          <footer className="admin-footer">
            © 2026 Farm Connect · Agricultural information management
          </footer>
        </section>
      </main>
    </div>
  );
}