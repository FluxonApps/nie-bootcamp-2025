import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ConnectPeople: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1>🤝 Connect with People</h1>
        <p>Discover and connect with your peers easily.</p>
      </div>
      <Footer />
    </>
  );
};

export default ConnectPeople;
