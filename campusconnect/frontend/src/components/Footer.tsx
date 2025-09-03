import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      &copy; {new Date().getFullYear()} Campus Connect. All rights reserved.
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#f3f3f3",
  textAlign: "center",
  padding: "1rem",
  marginTop: "2rem",
  fontSize: "0.9rem",
  color: "#333",
};

export default Footer;
