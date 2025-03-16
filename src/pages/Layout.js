import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const Layout =({children})=>{
    const location = useLocation();
    return(
        <div>
        
         <Navbar />
        <main>{children}</main>
      </div>
    );
}
export default Layout;