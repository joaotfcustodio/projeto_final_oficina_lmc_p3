import React from "react";

// Components
import Card from "@/components/card";
import VeiculoForm from "@/components/veiculos_form";
import VeiculoTable from "@/components/veiculos_table";
import VeiculosPorClienteTable from "@/components/veiculos_por_cliente_table";
// Styles
import "./styles.css";

const VeiculosPage = () => {
  return (
    <div className="veiculos-page">
      <h1 className="veiculos-title">
        ÁREA DE VEÍCULOS
      </h1>
      <div className="veiculos-container">
        <Card title="Adicionar Veículo">
          <VeiculoForm />
        </Card>
        <Card title="Lista de Veículos">
          <VeiculoTable />
        </Card>
        <Card title="Lista de Veículos associados a Clientes">
          <VeiculosPorClienteTable />
        </Card>
      </div>
    </div>
  );
};

export default VeiculosPage;
