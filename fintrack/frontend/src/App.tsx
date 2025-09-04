import  { type JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/onboardingView";
import { Login } from "./pages/login";
import Dashboard from "./pages/dashboard";  // <-- use their Dashboard
import FormPage from "./pages/FormPage";

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
