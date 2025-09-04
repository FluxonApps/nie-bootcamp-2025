import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeLanding from "./pages/home-landing";
import AdminDashboard from "./pages/admin-dashboard";
import Registration from "./pages/registration";
import RegistrationSuccess from "./pages/registration/components/RegistrationSuccess";
import LoginPage from "./pages/login";
import UserDashboard from "./pages/user-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* ✅ Landing page should be root */}
          <Route path="/" element={<HomeLanding />} />

          {/* ✅ Explicit landing URL if needed */}
          <Route path="/home-landing" element={<HomeLanding />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Auth */}
          <Route path="/registration" element={<Registration />} />
          <Route path="/registration/success" element={<RegistrationSuccess />} />
          <Route path="/login" element={<LoginPage />} />

          {/* User */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
