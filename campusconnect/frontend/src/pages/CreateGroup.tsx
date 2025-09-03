import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreateGroup: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1>👥 Create a Group</h1>
        <p>Start a group and collaborate with your friends and peers.</p>
      </div>
      <Footer />
    </>
  );
};

export default CreateGroup;
