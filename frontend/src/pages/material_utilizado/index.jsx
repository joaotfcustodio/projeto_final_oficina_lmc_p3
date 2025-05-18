import React from "react";

// Components
import Card from "@/components/card";
import MaterialUtilizadoForm from "@/components/material_utilizado_form/index";
import ReparacaoTable from "@/components/material_utilizado_form/material_utilizado_table";
// Styles
import "./styles.css";

const MateriaisUtilizadosPage = () => {
  return (
    <div className="materiais-utilizados-page">
      <h1 className="materiais-utilizados-title">
        ÁREA DE MATERIAIS UTILIZADOS
      </h1>
      <Card title="Adicionar Material Utilizado">
        <MaterialUtilizadoForm />
      </Card>
      <Card title="Procurar Reparações e Material Utilizado">
        <ReparacaoTable />
      </Card>
    </div>
  );
};

export default MateriaisUtilizadosPage;
