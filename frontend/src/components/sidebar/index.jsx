import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./styles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="mobile-header">
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <span className="mobile-title">App da Oficina</span>
      </div>

      <div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="sidebar-title">App da Oficina</div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/clientes" onClick={() => setMobileMenuOpen(false)}>Clientes</NavLink>
          <NavLink to="/veiculos" onClick={() => setMobileMenuOpen(false)}>Veículos</NavLink>
          <NavLink to="/reparacoes" onClick={() => setMobileMenuOpen(false)}>Reparações</NavLink>
          <NavLink to="/materiais" onClick={() => setMobileMenuOpen(false)}>Materiais Utilizados</NavLink>
        </nav>

        <div className="sidebar-logout">
          <button className="logout-btn" onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
