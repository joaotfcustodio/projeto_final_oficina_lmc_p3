import React from "react";

// Components
import Card from "@/components/card";
import ClienteForm from "@/components/clientes_form";
import ClienteTable from "@/components/clientes_table";

// Styles
import "./styles.css";

const ClientesPage = () => {
  return (
    <div className="clientes-page">
      <h1 className="clientes-title">
        ÁREA DE CLIENTE
      </h1>
      <div className="clientes-container">
        <Card title="Adicionar Cliente">
          <ClienteForm />
        </Card>
        <Card title="Lista de Clientes">
          <ClienteTable />
        </Card>
      </div>
    </div>
  );
};
export default ClientesPage;
