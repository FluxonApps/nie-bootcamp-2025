import { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboardingView";
import { Login } from "./pages/login";
import Dashboard from "./pages/dashboard";
import FormPage from "./pages/FormPage";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- import this

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
