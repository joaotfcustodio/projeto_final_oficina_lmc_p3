import React from "react";
import Sidebar from "../../components/navbar";
import MaterialUtilizadoForm from "../../components/material_utilizado_form/MaterialUtilizadoForm";

const MateriaisUtilizadosPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>ÁREA DE MATERIAIS UTILIZADOS</h2>
        <MaterialUtilizadoForm />
      </div>
    </div>
  );
};

export default MateriaisUtilizadosPage;
