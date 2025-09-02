import {BrowserRouter, Routes, Route}from "react-router-dom";
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;