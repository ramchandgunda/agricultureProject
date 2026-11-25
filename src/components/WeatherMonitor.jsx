import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../auth";

import {
  savedLocation,
  forecast,
  notifyWeather
} from "../services/weather";

export default function WeatherMonitor() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (getCurrentUser()?.role !== "user") return;

    let stopped = false;

    async function refresh() {
      const loc = savedLocation();
      const email = getCurrentUser()?.email;

      if (!loc) return;

      try {
        const data = await forecast(loc);

        if (
          !stopped &&
          getCurrentUser()?.email === email
        ) {
          notifyWeather(loc, data);
        }
      } catch {
        // A failed weather request should not crash the website.
      }
    }

    refresh();

    const timer = setInterval(
      refresh,
      30 * 60 * 1000
    );

    window.addEventListener(
      "fc-weather-location",
      refresh
    );

    return () => {
      stopped = true;
      clearInterval(timer);

      window.removeEventListener(
        "fc-weather-location",
        refresh
      );
    };
  }, [pathname]);

  return null;
}