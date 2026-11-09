
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

import { getCurrentUser } from "./auth";

// Protect routes according to login role
function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/user"}
        replace
      />
    );
  }

  return children;
}

// Both admin and user must be logged in
function PrivateRoute({ children }) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <User />
            </ProtectedRoute>
          }
        />

        {/* Farmer Service Pages - Login Required */}
        <Route
          path="/crop-guide"
          element={<PrivateRoute><CropGuide /></PrivateRoute>}
        />

        <Route
          path="/expert-help"
          element={<PrivateRoute><ExpertHelp /></PrivateRoute>}
        />

        <Route
          path="/farmer-alerts"
          element={<PrivateRoute><FarmerAlerts /></PrivateRoute>}
        />

        <Route
          path="/farmer-community"
          element={<PrivateRoute><FarmerCommunity /></PrivateRoute>}
        />

        <Route
          path="/fertilizers"
          element={<PrivateRoute><Fertilizers /></PrivateRoute>}
        />

        <Route
          path="/government-schemes"
          element={<PrivateRoute><GovernmentSchemes /></PrivateRoute>}
        />

        <Route
          path="/market-prices"
          element={<PrivateRoute><MarketPrices /></PrivateRoute>}
        />

        <Route
          path="/weather"
          element={<PrivateRoute><Weather /></PrivateRoute>}
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
