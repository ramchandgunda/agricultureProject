import { useState } from "react";

const sites = [
  ["PM-KISAN", "https://pmkisan.gov.in/"],
  ["e-NAM", "https://enam.gov.in/web/"],
  ["AGMARKNET", "https://agmarknet.gov.in/"],
  ["Crop Insurance", "https://pmfby.gov.in/"],
  ["Soil Health Card", "https://soilhealth.dac.gov.in/"],
  ["Ministry of Agriculture", "https://agriwelfare.gov.in/"],
  ["IMD Weather", "https://mausam.imd.gov.in/"]
];

export default function GovernmentTicker() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="fc-ticker">
      <span className="fc-ticker-label">
        🇮🇳 Official resources
      </span>

      <div className="fc-ticker-window">
        <div
          className={
            "fc-ticker-track" + (paused ? " paused" : "")
          }
        >
          {[...sites, ...sites].map(([name, url], i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={i >= sites.length ? -1 : 0}
              aria-hidden={i >= sites.length || undefined}
            >
              {name} <span>↗</span>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => setPaused(!paused)}
        aria-label={
          paused ? "Resume scrolling" : "Pause scrolling"
        }
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}