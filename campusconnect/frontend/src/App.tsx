import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

import ConnectPeople from './pages/ConnectPeople.tsx';
import Profile from "./pages/Profile";
import CreateGroup from "./pages/CreateGroup.tsx";
import ConnectionsList from "./pages/ConnectionsList";
import RequestsList from "./pages/RequestsList";
import Groups from "./pages/Groups";         


const App: React.FC = () => {
  const userId = localStorage.getItem("userId");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/connect" element={<ConnectPeople />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<ConnectionsList userId={userId || ""} />} />
        <Route path="/requests" element={<RequestsList userId={userId || ""}/>} />
        <Route path="/groups" element={<Groups />} /> {/* 👈 Groups Page */}
      </Routes>
    </Router>
  );
};

export default App;