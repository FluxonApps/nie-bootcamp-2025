import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ConnectPeople from "./pages/ConnectPeople";
import Profile from "./pages/Profile";
import Groups from "./pages/Groups"; // 👈 new

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/connect" element={<ConnectPeople />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} /> {/* 👈 Groups Page */}
      </Routes>
    </Router>
  );
};

export default App;
