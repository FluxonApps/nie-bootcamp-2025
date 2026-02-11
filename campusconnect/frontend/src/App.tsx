import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";


import ConnectPeople from './pages/ConnectPeople.tsx';

import Profile from "./pages/Profile";

import CreateGroup from "./pages/CreateGroup.tsx";

import Groups from "./pages/Groups";         
import Posts from "./pages/Posts.tsx";
import ConnectionsList from "./pages/ConnectionsList.tsx";  
import RequestsList from "./pages/RequestsList.tsx";




const App: React.FC = () => {
  const userId = localStorage.getItem("userId");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/groups" element={<Groups />} /> {/* 👈 Groups Page */}
        <Route path="/connect" element={<ConnectPeople />} />
        <Route path="/connections" element={userId ? <ConnectionsList userId={userId} /> : <SignIn />} />
        <Route path="/requests" element={userId ? <RequestsList userId={userId} /> : <SignIn />} />
  
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
  );
};

export default App;