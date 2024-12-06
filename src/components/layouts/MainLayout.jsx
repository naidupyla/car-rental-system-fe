import React from "react";
import Navbar from "../Shared/navbar/Navbar";
import Footer from "../Shared/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        <div className="main-container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
