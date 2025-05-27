import React, { useState } from "react";
import Card from "@/components/card";
import ClienteForm from "@/components/clientes_form";
import ClienteTable from "@/components/clientes_table";
import "./styles.css";

const ClientesPage = () => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="clientes-page">
      <h1 className="clientes-title">ÁREA DE CLIENTE</h1>
      <div className="clientes-container">
        <Card title="Adicionar Cliente">
          <ClienteForm
            clienteSelecionado={clienteSelecionado}
            resetClienteSelecionado={() => setClienteSelecionado(null)}
            onCreated={() => setRefresh(!refresh)}
          />
        </Card>
        <Card title="Lista de Clientes">
          <ClienteTable
            onEditar={setClienteSelecionado}
            onUpdated={() => setRefresh(!refresh)}
            key={refresh}
          />
        </Card>
      </div>
    </div>
  );
};

export default ClientesPage;
