import React from "react";
import Sidebar from "../../components/navbar";
import VeiculoForm from "../../components/veiculos_form/VeiculosForm";
import VeiculoTable from "../../components/veiculos_table/veiculosTable";
import "./veiculos.css";

const VeiculosPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "40px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "30px" }}>ÁREA DE VEÍCULOS</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <VeiculoForm />
          <VeiculoTable />
        </div>
      </div>
    </div>
  );
};

export default VeiculosPage;
