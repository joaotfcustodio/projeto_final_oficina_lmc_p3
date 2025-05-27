import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout"; // <- Ícone MUI

// Styles
import "./styles.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">App da Oficina</div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/clientes">Clientes</NavLink>
        <NavLink to="/veiculos">Veículos</NavLink>
        <NavLink to="/reparacoes">Reparações</NavLink>
        <NavLink to="/materiais">Materiais Utilizados</NavLink>
      </nav>

      {/* Botão logout fixo no fundo */}
      <div className="sidebar-logout">
        <button className="logout-btn" onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
