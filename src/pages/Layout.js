import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout =({children})=>{
    const location = useLocation();
    return(
        <div>
        {/* Chỉ hiển thị Navbar nếu không phải trang Dashboard */}
        {location.pathname !== "/dashboard" && <Navbar />} 
        <main>{children}</main>
      </div>
    );
}
export default Layout;