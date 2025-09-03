import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ConnectPeople from "./pages/ConnectPeople";
import CreateGroup from "./pages/CreateGroup.tsx";
import Profile from "./pages/Profile.tsx";
import ConnectionsList from "./pages/ConnectionsList";
import RequestsList from "./pages/RequestsList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/connect" element={<ConnectPeople />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connections" element={<ConnectionsList userId="68b82038c44844746251f832" />} />
        <Route path="/requests" element={<RequestsList userId="68b7cbd7ec80daa0628be738" />} />
      </Routes>
    </Router>
  );
};

export default App;
