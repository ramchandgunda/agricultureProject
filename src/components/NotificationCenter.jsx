import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../auth";

const categories = {
  weather: "Weather",
  market: "Market prices",
  schemes: "Government schemes",
  alerts: "Farmer alerts",
  crops: "Crop guides"
};

const sources = [
  ["marketPrices", "market", "Market price update", "crop"],
  ["farmSchemes", "schemes", "Scheme update", "name"],
  ["farmAlerts", "alerts", "Farmer announcement", "title"],
  ["farmCrops", "crops", "Crop guide update", "name"]
];

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

const userKey = () =>
  "fc-notifications:" + (getCurrentUser()?.email || "guest");

const prefsKey = () => userKey() + ":preferences";

export function addFarmNotification(n) {
  const key = userKey();

  if (read(prefsKey(), {})[n.type] === false) return;

  const items = read(key, []);

  if (n.id && items.some(i => i.id === n.id)) return;

  localStorage.setItem(
    key,
    JSON.stringify([
      {
        ...n,
        id: n.id || crypto.randomUUID(),
        read: false,
        date: new Date().toISOString()
      },
      ...items
    ].slice(0, 200))
  );

  window.dispatchEvent(new Event("fc-notifications"));
}

export default function NotificationCenter() {
  const location = useLocation();
  const user = getCurrentUser();

  const [items, setItems] = useState([]);
  const [prefs, setPrefs] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function refresh() {
      setItems(read(userKey(), []));
      setPrefs(read(prefsKey(), {}));
    }

    function scan() {
      if (getCurrentUser()?.role !== "user") return;

      for (const [key, type, title, field] of sources) {
        for (const r of read(key, []).slice(-30)) {
          addFarmNotification({
            id: key + ":" + r.id,
            title,
            message: String(r[field] || title),
            type
          });
        }
      }

      refresh();
    }

    refresh();
    scan();

    const timer = setInterval(scan, 15000);

    window.addEventListener("storage", scan);
    window.addEventListener("fc-notifications", refresh);

    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", scan);
      window.removeEventListener("fc-notifications", refresh);
    };
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (user?.role !== "user") return null;

  function mark() {
    const next = items.map(i => ({
      ...i,
      read: true
    }));

    localStorage.setItem(userKey(), JSON.stringify(next));
    setItems(next);
  }

  const unread = items.filter(i => !i.read).length;

  return (
    <div className="fc-notify">
      <button
        className="fc-bell"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Notifications"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
        </svg>

        {unread > 0 && <b>{unread}</b>}
      </button>

      {open && (
        <section className="fc-notify-panel">
          <header>
            <div>
              <h3>Notifications</h3>
              <small>Your farming updates</small>
            </div>

            <button onClick={mark}>
              Mark all read
            </button>
          </header>

          <details>
            <summary>Notification preferences</summary>

            {Object.entries(categories).map(([key, label]) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={prefs[key] !== false}
                  onChange={e => {
                    const next = {
                      ...prefs,
                      [key]: e.target.checked
                    };

                    setPrefs(next);

                    localStorage.setItem(
                      prefsKey(),
                      JSON.stringify(next)
                    );
                  }}
                />

                {" "}{label}
              </label>
            ))}
          </details>

          {items.length ? (
            items.map(i => (
              <article
                key={i.id}
                className={i.read ? "read" : ""}
              >
                <span>
                  {i.type === "weather" ? "☁" : "●"}
                </span>

                <div>
                  <strong>{i.title}</strong>
                  <p>{i.message}</p>

                  <small>
                    {new Date(i.date).toLocaleString()}
                  </small>
                </div>
              </article>
            ))
          ) : (
            <p>No new updates yet.</p>
          )}

          <Link
            to="/weather"
            onClick={() => setOpen(false)}
          >
            Manage weather location →
          </Link>

          <small>
            Browser-local notifications; no background push yet.
          </small>
        </section>
      )}
    </div>
  );
}