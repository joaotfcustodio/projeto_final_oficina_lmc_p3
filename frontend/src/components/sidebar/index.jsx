import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./styles.css";

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
