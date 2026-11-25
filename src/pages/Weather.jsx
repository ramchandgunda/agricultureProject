import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  savedLocation,
  saveLocation,
  lookup,
  forecast,
  notifyWeather
} from "../services/weather";

const describe = c =>
  c === 0 ? "Clear sky" :
  c <= 3 ? "Cloudy" :
  c >= 95 ? "Thunderstorms" :
  c >= 80 ? "Showers" :
  c >= 71 ? "Snow" :
  c >= 51 ? "Rain or drizzle" :
  "Fog";

export default function Weather() {
  const [loc, setLoc] = useState(savedLocation);
  const [city, setCity] = useState("");
  const [choices, setChoices] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [updated, setUpdated] = useState(null);

  function choose(l) {
    saveLocation(l);
    setLoc(l);
    setChoices([]);
  }

  function detect() {
    if (!navigator.geolocation) {
      setError("Location unavailable. Search for a town.");
      return;
    }

    setBusy(true);

    navigator.geolocation.getCurrentPosition(
      p => {
        choose({
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
          name: "Your current location"
        });

        setBusy(false);
      },
      () => {
        setBusy(false);

        setError(
          "Location permission unavailable. Search for your town instead."
        );
      },
      {
        timeout: 10000,
        maximumAge: 300000
      }
    );
  }

  useEffect(() => {
    if (!loc && navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(p => {
          if (p.state === "granted") detect();
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!loc) return;

    let stop = false;

    setData(null);

    async function refresh() {
      setBusy(true);
      setError("");

      try {
        const d = await forecast(loc);

        if (!stop) {
          setData(d);
          setUpdated(new Date());
          notifyWeather(loc, d);
        }
      } catch (e) {
        if (!stop) setError(e.message);
      } finally {
        if (!stop) setBusy(false);
      }
    }

    refresh();

    const timer = setInterval(
      refresh,
      30 * 60 * 1000
    );

    return () => {
      stop = true;
      clearInterval(timer);
    };
  }, [loc]);

  async function search(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    try {
      const results = await lookup(city);

      setChoices(results);

      if (!results.length) {
        setError("No matching towns found.");
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="feature-page fc-weather">

      <div className="feature-heading">
        <span className="eyebrow">
          FIELD INTELLIGENCE
        </span>

        <h1>Weather for your farm</h1>

        <p>
          Location-based forecasts, refreshed automatically
          every 30 minutes while the website is open.
        </p>
      </div>

      <form
        className="store-toolbar"
        onSubmit={search}
      >
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Search town or district in India"
          required
        />

        <button
          className="fc-action"
          disabled={busy}
        >
          Search
        </button>

        <button
          type="button"
          className="fc-action secondary"
          onClick={detect}
        >
          ◎ Use my location
        </button>
      </form>

      {choices.map(l => (
        <button
          className="fc-action secondary"
          key={l.latitude + ":" + l.longitude}
          onClick={() => choose(l)}
        >
          {l.name}
        </button>
      ))}

      {busy && <p>Updating weather…</p>}

      {error && <p role="alert">{error}</p>}

      {!loc && (
        <p>
          Choose a location once to enable
          automatic forecasts.
        </p>
      )}

      {data && (
        <>
          <section className="weather-now">

            <small>
              LOCAL FORECAST · {loc.name}
            </small>

            <h2>
              {Math.round(
                data.current.temperature_2m
              )}°C
            </h2>

            <p>
              {describe(data.current.weather_code)}
            </p>

            <div className="weather-metrics">

              <span>
                Humidity
                <b>
                  {data.current.relative_humidity_2m}%
                </b>
              </span>

              <span>
                Wind
                <b>
                  {data.current.wind_speed_10m} km/h
                </b>
              </span>

              <span>
                Precipitation
                <b>
                  {data.current.precipitation} mm
                </b>
              </span>

            </div>

            <small>
              Updated {updated?.toLocaleString()}
            </small>

          </section>

          <h2 className="fc-week-title">
            7-day outlook
          </h2>

          <div className="forecast-grid">

            {data.daily.time.map((day, i) => (
              <article key={day}>

                <b>{day}</b>

                <span>
                  {describe(
                    data.daily.weather_code[i]
                  )}
                </span>

                <strong>
                  {data.daily.temperature_2m_max[i]}° /
                  {data.daily.temperature_2m_min[i]}°
                </strong>

                <small>
                  Rain chance:{" "}
                  {data.daily.precipitation_probability_max[i] ?? "—"}%
                </small>

              </article>
            ))}

          </div>
        </>
      )}

      <p className="store-disclaimer">
        Forecast:{" "}

        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
        >
          Open-Meteo
        </a>.

        For official warnings consult{" "}

        <a
          href="https://mausam.imd.gov.in/"
          target="_blank"
          rel="noreferrer"
        >
          IMD
        </a>.

        Alerts are forecast-based, not official
        warnings. Automatic checking requires an
        open browser tab.
      </p>

      <Link className="feature-back" to="/user">
        ← Dashboard
      </Link>

    </main>
  );
}