import {
  useEffect,
  useState,
  useMemo,
  useCallback
} from "react";

import { Link } from "react-router-dom";

import {
  fetchMarketPrices,
  formatPrice,
  REFRESH_INTERVAL
} from "../services/marketPrices";

import "./MarketPrices.css";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir"
];

function readManualPrices() {
  try {
    return JSON.parse(
      localStorage.getItem("marketPrices") || "[]"
    );
  } catch {
    return [];
  }
}

export default function MarketPrices() {
  const [records, setRecords] = useState([]);
  const [state, setState] = useState("Telangana");
  const [district, setDistrict] = useState("");
  const [search, setSearch] = useState("");
  const [commodity, setCommodity] = useState("");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(null);
  const [cached, setCached] = useState(false);
  const [tab, setTab] = useState("government");
  const [page, setPage] = useState(1);

  const [manualPrices] = useState(readManualPrices);

  const pageSize = 20;

  const loadPrices = useCallback(async () => {
    setLoading(true);
    setError("");
    setCached(false);

    const cacheKey =
      `fc-mandi:${state}:${commodity}`;

    try {
      const data = await fetchMarketPrices(
        state,
        commodity
      );

      setRecords(data);

      const time = new Date().toISOString();

      setUpdated(time);

      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            records: data,
            updated: time
          })
        );
      } catch {
        // Continue even if browser storage is full.
      }

    } catch (err) {
      setError(err.message);

      try {
        const saved = JSON.parse(
          localStorage.getItem(cacheKey) || "null"
        );

        if (saved) {
          setRecords(saved.records);
          setUpdated(saved.updated);
          setCached(true);
        } else {
          setRecords([]);
          setUpdated(null);
        }
      } catch {
        setRecords([]);
        setUpdated(null);
      }

    } finally {
      setLoading(false);
    }
  }, [state, commodity]);

  useEffect(() => {
    setDistrict("");
    setPage(1);

    loadPrices();

    const timer = setInterval(
      loadPrices,
      REFRESH_INTERVAL
    );

    return () => clearInterval(timer);
  }, [loadPrices]);

  useEffect(() => {
    setPage(1);
  }, [search, district, sort]);

  const districts = useMemo(
    () =>
      [...new Set(
        records.map(r => r.district).filter(Boolean)
      )].sort(),
    [records]
  );

  const filtered = useMemo(() => {
    const result = records.filter(r => {
      const text = `
        ${r.crop}
        ${r.market}
        ${r.variety}
        ${r.district}
      `.toLowerCase();

      return (
        text.includes(search.toLowerCase()) &&
        (!district || r.district === district)
      );
    });

    if (sort === "low") {
      result.sort(
        (a, b) =>
          Number(a.modalPrice ?? Infinity) -
          Number(b.modalPrice ?? Infinity)
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) =>
          Number(b.modalPrice ?? -Infinity) -
          Number(a.modalPrice ?? -Infinity)
      );
    }

    return result;
  }, [records, search, district, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const cropCount = new Set(
    records.map(r => r.crop).filter(Boolean)
  ).size;

  const marketCount = new Set(
    records.map(r =>
      `${r.state}:${r.district}:${r.market}`
    )
  ).size;

  return (
    <main className="mp-page">

      <div className="mp-navigation">

        <Link to="/user">
          ← Farmer Dashboard
        </Link>

        <span>Market Intelligence</span>

      </div>

      <section className="mp-hero">

        <div>
          <span className="mp-eyebrow">
            FARM CONNECT · MARKET INTELLIGENCE
          </span>

          <h1>Agricultural Market Prices</h1>

          <p>
            Explore government-reported wholesale
            agricultural prices from Indian mandis.
          </p>

          <div className="mp-source">
            <span className="mp-dot"></span>
            AGMARKNET · India API
          </div>
        </div>

        <div className="mp-hero-icon">
          ₹
        </div>

      </section>

      <section className="mp-stats">

        <article>
          <span>Market records loaded</span>
          <strong>{records.length}</strong>
          <small>Retrieved price records</small>
        </article>

        <article>
          <span>Commodities loaded</span>
          <strong>{cropCount}</strong>
          <small>Different agricultural products</small>
        </article>

        <article>
          <span>Markets loaded</span>
          <strong>{marketCount}</strong>
          <small>Markets in retrieved records</small>
        </article>

        <article>
          <span>Automatic refresh</span>
          <strong>30 min</strong>
          <small>While this page is open</small>
        </article>

      </section>

      <div className="mp-tabs">

        <button
          className={
            tab === "government" ? "active" : ""
          }
          onClick={() => setTab("government")}
        >
          Government Market Prices
        </button>

        <button
          className={
            tab === "manual" ? "active" : ""
          }
          onClick={() => setTab("manual")}
        >
          Admin Published Prices
        </button>

      </div>

      {tab === "government" && (
        <>

          <section className="mp-panel">

            <div className="mp-panel-heading">

              <div>
                <h2>Explore market prices</h2>

                <p>
                  Filter prices by state, district
                  and agricultural commodity.
                </p>
              </div>

              <button
                className="mp-refresh"
                onClick={loadPrices}
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : "↻ Refresh prices"}
              </button>

            </div>

            <div className="mp-filters">

              <label>
                State

                <select
                  value={state}
                  onChange={e =>
                    setState(e.target.value)
                  }
                >
                  <option value="">
                    All India
                  </option>

                  {states.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                District

                <select
                  value={district}
                  onChange={e =>
                    setDistrict(e.target.value)
                  }
                >
                  <option value="">
                    All districts
                  </option>

                  {districts.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Search loaded records

                <input
                  value={search}
                  onChange={e =>
                    setSearch(e.target.value)
                  }
                  placeholder="Crop or market..."
                />
              </label>

              <label>
                Sort by modal price

                <select
                  value={sort}
                  onChange={e =>
                    setSort(e.target.value)
                  }
                >
                  <option value="default">
                    Default
                  </option>

                  <option value="low">
                    Price: Low to high
                  </option>

                  <option value="high">
                    Price: High to low
                  </option>
                </select>
              </label>

            </div>

            <form
              className="mp-api-search"
              onSubmit={e => {
                e.preventDefault();

                setCommodity(
                  e.currentTarget.elements
                    .commodity.value.trim()
                );
              }}
            >
              <input
                name="commodity"
                placeholder="API commodity name, e.g. Tomato"
              />

              <button type="submit">
                Search API
              </button>

              <button
                type="reset"
                onClick={() => {
                  setCommodity("");
                  setSearch("");
                }}
              >
                Clear
              </button>
            </form>

            <div className="mp-update-info">

              <span>
                {filtered.length} matching records
              </span>

              <span>
                Last retrieved:{" "}
                {updated
                  ? new Date(updated).toLocaleString(
                      "en-IN"
                    )
                  : "Not yet available"}
              </span>

            </div>

          </section>

          {error && (
            <div className="mp-warning" role="alert">
              {error}

              <p>
                {cached
                  ? "Showing previously retrieved prices."
                  : "No cached prices are available. Try again later."}
              </p>
            </div>
          )}

          <section className="mp-panel">

            <div className="mp-table-wrapper">

              <table className="mp-table">

                <thead>
                  <tr>
                    <th>Commodity</th>
                    <th>Market</th>
                    <th>State / District</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>Modal Price</th>
                    <th>Reported Date</th>
                  </tr>
                </thead>

                <tbody>

                  {visible.map(r => (
                    <tr key={r.id}>

                      <td>
                        <strong>
                          {r.crop || "—"}
                        </strong>

                        <small>{r.variety}</small>
                      </td>

                      <td>{r.market || "—"}</td>

                      <td>
                        {r.state}

                        <small>{r.district}</small>
                      </td>

                      <td>
                        {formatPrice(r.minPrice)}
                      </td>

                      <td>
                        {formatPrice(r.maxPrice)}
                      </td>

                      <td className="mp-modal">
                        {formatPrice(r.modalPrice)}
                      </td>

                      <td>{r.date || "—"}</td>

                    </tr>
                  ))}

                  {!visible.length && (
                    <tr>
                      <td colSpan="7">

                        <div className="mp-empty">

                          {loading
                            ? "Fetching market prices..."
                            : "No matching price records available."}

                        </div>

                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

            <div className="mp-pagination">

              <button
                disabled={currentPage <= 1}
                onClick={() =>
                  setPage(currentPage - 1)
                }
              >
                ← Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage(currentPage + 1)
                }
              >
                Next →
              </button>

            </div>

          </section>

        </>
      )}

      {tab === "manual" && (

        <section className="mp-panel">

          <h2>Admin Published Prices</h2>

          <p>
            Manually entered, browser-local records.
            These are not verified government API prices.
          </p>

          <div className="mp-table-wrapper">

            <table className="mp-table">

              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Market</th>
                  <th>Price / Quintal</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {manualPrices.map(r => (
                  <tr key={r.id}>

                    <td>{r.crop}</td>
                    <td>{r.market}</td>

                    <td className="mp-modal">
                      {formatPrice(r.price)}
                    </td>

                    <td>{r.date}</td>

                  </tr>
                ))}

                {!manualPrices.length && (
                  <tr>
                    <td colSpan="4">
                      No Admin prices available.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </section>

      )}

      <footer className="mp-footer">

        <p>
          All API prices are expressed in Indian rupees
          per quintal (100 kg). Modal price is the
          representative reported market price.
        </p>

        <p>
          Prices are daily reported wholesale rates,
          not real-time transaction quotations.
          Market coverage and reporting dates may vary.
        </p>

        <a
          href="https://api.dharun.dev/docs/mandi"
          target="_blank"
          rel="noopener noreferrer"
        >
          India API Documentation ↗
        </a>

        <a
          href="https://agmarknet.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Official AGMARKNET ↗
        </a>

      </footer>

    </main>
  );
}