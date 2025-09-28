import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserRegister from "../components/auth/UserRegister";
import UserLogin from "../components/auth/UserLogin";
import FoodPartnerRegister from "../components/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../components/auth/FoodPartnerLogin";
import Home from "../components/pages/Home";
import AddFood from "../components/pages/AddFood";
import CreateFood from "../components/pages/CreateFood";
import Profile from "../components/pages/Profile";
import Store from "../components/pages/Store";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/user/signup" replace />} />

          <Route path="/user/signup" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/food-partner/signup"
            element={<FoodPartnerRegister />}
          />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />

          {/* protected routes */}

          <Route path="/home" element={<Home />} />
          <Route path="/addfood" element={<AddFood />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store/:id" element={<Store />} />

          {/* Fallback 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
