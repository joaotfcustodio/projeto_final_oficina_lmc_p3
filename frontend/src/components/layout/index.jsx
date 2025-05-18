import { Outlet } from "react-router-dom";

// Components
import Sidebar from "@/components/sidebar";

// Styles
import "./styles.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar/>
      <div className="layout-content">
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
