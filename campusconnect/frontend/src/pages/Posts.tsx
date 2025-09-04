import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Posts: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1>Add ur posts</h1>
        <p>Update your personal information and preferences here.</p>
      </div>
      <Footer />
    </>
  );
};

export default Posts;
