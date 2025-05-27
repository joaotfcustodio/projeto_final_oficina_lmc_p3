import React, { useState } from "react";

// Components
import Card from "@/components/card";
import MaterialUtilizadoForm from "@/components/material_utilizado_form/index";
import ReparacaoTable from "@/components/material_utilizado_form/material_utilizado_table";

// Styles
import "./styles.css";

const MateriaisUtilizadosPage = () => {
  const [materialSelecionado, setMaterialSelecionado] = useState(null);

  return (
    <div className="materiais-utilizados-page">
      <h1 className="materiais-utilizados-title">
        ÁREA DE MATERIAIS UTILIZADOS
      </h1>

      <div className="materiais-utilizados-container">
        <Card title="Adicionar Material Utilizado">
          <MaterialUtilizadoForm material={materialSelecionado} />
        </Card>

        <Card title="Procurar Reparações e Material Utilizado">
          <ReparacaoTable onEditar={setMaterialSelecionado} />
        </Card>
      </div>
    </div>
  );
};

export default MateriaisUtilizadosPage;
