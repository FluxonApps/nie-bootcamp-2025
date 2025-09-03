import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1>👤 Set Your Profile</h1>
        <p>Update your personal information and preferences here.</p>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
