import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const states = [
  ["Andhra Pradesh", "Rice, chilli, cotton, groundnut, tobacco"],
  ["Arunachal Pradesh", "Rice, maize, millet, pulses"],
  ["Assam", "Rice, tea, jute, mustard"],
  ["Bihar", "Rice, wheat, maize, pulses"],
  ["Chhattisgarh", "Rice, maize, pulses"],
  ["Goa", "Rice, coconut, cashew"],
  ["Gujarat", "Cotton, groundnut, castor, wheat"],
  ["Haryana", "Wheat, rice, mustard, cotton"],
  ["Himachal Pradesh", "Apple, maize, wheat, barley"],
  ["Jharkhand", "Rice, maize, pulses, oilseeds"],
  ["Karnataka", "Ragi, rice, coffee, sugarcane, cotton"],
  ["Kerala", "Coconut, rubber, spices, rice"],
  ["Madhya Pradesh", "Soybean, wheat, gram, pulses"],
  ["Maharashtra", "Cotton, sugarcane, soybean, jowar"],
  ["Manipur", "Rice, maize, pulses"],
  ["Meghalaya", "Rice, maize, potato, ginger"],
  ["Mizoram", "Rice, maize, ginger, turmeric"],
  ["Nagaland", "Rice, maize, millet, pulses"],
  ["Odisha", "Rice, pulses, oilseeds"],
  ["Punjab", "Wheat, rice, cotton, maize"],
  ["Rajasthan", "Bajra, wheat, mustard, pulses"],
  ["Sikkim", "Large cardamom, maize, rice, buckwheat"],
  ["Tamil Nadu", "Rice, sugarcane, cotton, groundnut"],
  ["Telangana", "Rice, cotton, maize, turmeric"],
  ["Tripura", "Rice, rubber, tea, pineapple"],
  ["Uttar Pradesh", "Wheat, rice, sugarcane, potato"],
  ["Uttarakhand", "Rice, wheat, millet, pulses"],
  ["West Bengal", "Rice, jute, potato, tea"]
];

const lanes = [
  ["Punjab", "Delhi", "Wheat · grain markets"],
  ["Maharashtra", "Gujarat", "Cotton · textile supply chain"],
  ["Andhra Pradesh", "Telangana", "Chilli · regional trade"],
  ["Karnataka", "Tamil Nadu", "Coffee · spices · produce"],
  ["West Bengal", "Bihar", "Rice · jute"],
  ["Madhya Pradesh", "Rajasthan", "Soybean · pulses"]
];

export default function IndiaCropMap() {
  const [selected, setSelected] =
    useState("Andhra Pradesh");

  const [route, setRoute] = useState(lanes[0]);

  const data = useMemo(
    () => states.find(s => s[0] === selected),
    [selected]
  );

  return (
    <main className="feature-page">
      <div className="feature-heading">
        <span className="eyebrow">
          INDIA AGRICULTURE ATLAS
        </span>

        <h1>India Crop & Trade Map</h1>

        <p>
          Select a state to explore common crops and
          example inter-state trade corridors.
        </p>
      </div>

      <div className="atlas-layout">
        <section className="atlas-panel">
          <div className="atlas-map-title">
            <b>Explore states</b>
            <small>
              Schematic state selector · not to geographic scale
            </small>
          </div>

          <div className="state-grid">
            {states.map(([name]) => (
              <button
                key={name}
                onClick={() => setSelected(name)}
                className={
                  selected === name ? "selected" : ""
                }
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        <aside className="state-detail">
          <span className="eyebrow">
            SELECTED STATE
          </span>

          <h2>{data[0]}</h2>

          <p>Commonly cultivated crops (indicative)</p>

          <div className="crop-tags">
            {data[1].split(", ").map(c => (
              <span key={c}>{c}</span>
            ))}
          </div>

          <small>
            Crop patterns vary by district, season,
            irrigation and local conditions.
          </small>
        </aside>
      </div>

      <section className="route-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              ILLUSTRATIVE LOGISTICS
            </span>

            <h2>Inter-state crop corridors</h2>

            <p>
              Example connections to explore produce
              movement across India.
            </p>
          </div>
        </div>

        <div className="route-list">
          {lanes.map((r, i) => (
            <button
              className={
                route[0] === r[0] &&
                route[1] === r[1]
                  ? "active"
                  : ""
              }
              key={i}
              onClick={() => setRoute(r)}
            >
              <span>📍 {r[0]}</span>
              <b>⟶</b>
              <span>📍 {r[1]}</span>
              <small>{r[2]}</small>
            </button>
          ))}
        </div>

        <div className="route-highlight">
          <b>
            {route[0]} → {route[1]}
          </b>

          <p>{route[2]}</p>

          <small>
            Illustrative corridor only. This is not live
            freight routing or a transport booking.
          </small>
        </div>
      </section>

      <Link className="feature-back" to="/user">
        ← Back to dashboard
      </Link>
    </main>
  );
}