import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import { getCurrentUser } from "./auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import User from "./pages/User";

import CropGuide from "./pages/CropGuide";
import ExpertHelp from "./pages/ExpertHelp";
import FarmerAlerts from "./pages/FarmerAlerts";
import FarmerCommunity from "./pages/FarmerCommunity";
import Fertilizers from "./pages/Fertilizers";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import MarketPrices from "./pages/MarketPrices";
import Weather from "./pages/Weather";
import FarmStore from "./pages/FarmStore";
import IndiaCropMap from "./pages/IndiaCropMap";

import GovernmentTicker from "./components/GovernmentTicker";
import NotificationCenter from "./components/NotificationCenter";
import WeatherMonitor from "./components/WeatherMonitor";

function ProtectedRoute({ role }) {
  const current = getCurrentUser();

  if (!current) {
    return <Navigate to="/login" replace />;
  }

  if (current.role !== role) {
    return (
      <Navigate
        to={current.role === "admin" ? "/admin" : "/user"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>

      <WeatherMonitor />

      <div className="fc-topbar">
        <GovernmentTicker />
        <NotificationCenter />
      </div>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<ProtectedRoute role="user" />}>

          <Route path="/user" element={<User />} />

          <Route path="/crop-guide" element={<CropGuide />} />

          <Route path="/expert-help" element={<ExpertHelp />} />

          <Route path="/farmer-alerts" element={<FarmerAlerts />} />

          <Route path="/farmer-community" element={<FarmerCommunity />} />

          <Route path="/fertilizers" element={<Fertilizers />} />

          <Route
            path="/government-schemes"
            element={<GovernmentSchemes />}
          />

          <Route path="/market-prices" element={<MarketPrices />} />

          <Route path="/weather" element={<Weather />} />

          <Route path="/farm-store" element={<FarmStore />} />

          <Route path="/india-crop-map" element={<IndiaCropMap />} />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

    </BrowserRouter>
  );
}