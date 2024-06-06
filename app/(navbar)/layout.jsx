import React from "react";
import Navbar from "@/components/Navbar";

function Layout({ children }) {
  return (
    <div className=" px-6 py-2">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
