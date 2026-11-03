
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />

        <Route path="/crop-guide" element={<CropGuide />} />
        <Route path="/expert-help" element={<ExpertHelp />} />
        <Route path="/farmer-alerts" element={<FarmerAlerts />} />
        <Route path="/farmer-community" element={<FarmerCommunity />} />
        <Route path="/fertilizers" element={<Fertilizers />} />
        <Route path="/government-schemes" element={<GovernmentSchemes />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
