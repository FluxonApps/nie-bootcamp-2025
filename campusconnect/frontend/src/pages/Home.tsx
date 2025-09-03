import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>Welcome to Campus Connect</h1>
        <p>You have successfully signed in!</p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
