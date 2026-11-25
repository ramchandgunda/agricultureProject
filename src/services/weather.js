import { getCurrentUser } from "../auth";
import {
  addFarmNotification
} from "../components/NotificationCenter";

export const locationKey = () =>
  "fc-weather-location:" +
  (getCurrentUser()?.email || "guest");

export function savedLocation() {
  try {
    return JSON.parse(
      localStorage.getItem(locationKey())
    );
  } catch {
    return null;
  }
}

export function saveLocation(loc) {
  localStorage.setItem(
    locationKey(),
    JSON.stringify(loc)
  );

  window.dispatchEvent(
    new Event("fc-weather-location")
  );
}

export async function lookup(city) {
  const response = await fetch(
    "https://geocoding-api.open-meteo.com/v1/search" +
    "?count=5&countryCode=IN&name=" +
    encodeURIComponent(city),
    {
      signal: AbortSignal.timeout(15000)
    }
  );

  if (!response.ok) {
    throw Error("Location service unavailable");
  }

  const data = await response.json();

  return (data.results || []).map(x => ({
    latitude: x.latitude,
    longitude: x.longitude,
    name: [x.name, x.admin1]
      .filter(Boolean)
      .join(", ")
  }));
}

export async function forecast(loc) {
  const query = new URLSearchParams({
    latitude: loc.latitude,
    longitude: loc.longitude,

    current:
      "temperature_2m,relative_humidity_2m," +
      "precipitation,weather_code,wind_speed_10m",

    daily:
      "temperature_2m_max,temperature_2m_min," +
      "precipitation_probability_max,weather_code",

    timezone: "auto",
    forecast_days: 7
  });

  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?" + query,
    {
      signal: AbortSignal.timeout(15000)
    }
  );

  if (!response.ok) {
    throw Error("Weather provider unavailable");
  }

  const data = await response.json();

  if (!data.current || !data.daily) {
    throw Error("Forecast incomplete");
  }

  return data;
}

export function notifyWeather(loc, data) {
  const chance =
    data.daily.precipitation_probability_max[0];

  const code = data.daily.weather_code[0];

  const storm = [95, 96, 99].includes(code);

  if (chance >= 70 || storm) {
    addFarmNotification({
      id:
        "weather:" +
        loc.latitude + ":" +
        loc.longitude + ":" +
        data.daily.time[0] + ":" +
        (storm ? "storm" : "rain"),

      title: storm
        ? "Thunderstorm forecast"
        : "Rain forecast",

      message:
        `${loc.name}: ` +
        `${storm ? "Thunderstorms are forecast. " : ""}` +
        `Rain probability ${chance ?? "unavailable"}` +
        `${chance == null ? "" : "%"}. ` +
        "Check official IMD advisories.",

      type: "weather"
    });
  }
}