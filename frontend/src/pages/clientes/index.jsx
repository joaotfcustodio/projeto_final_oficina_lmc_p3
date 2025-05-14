import React from "react";
import Sidebar from "../../components/navbar";
import ClienteForm from "../../components/clientes_form/ClienteForm";
import ClienteTable from "../../components/clientes_table/ClienteTable";
import "./clientes.css";

const ClientesPage = () => {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
  
        {/* Este marginLeft empurra o conteúdo para o lado da sidebar fixa */}
        <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
        <h1 style={{ marginBottom: "30px", fontSize: "28px" }}>ÁREA DE CLIENTE</h1>
          <div className="clientes-container" style={{ display: "flex", gap: "40px" }}>
            <ClienteForm />
            <ClienteTable />
          </div>
        </div>
      </div>
    );
  };
  export default ClientesPage;