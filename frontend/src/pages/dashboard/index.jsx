// Components
import Card from "@/components/card";
import ClienteTable from "@/components/clientes_table";
import ReparacaoForm from "@/components/reparacoes_form/ReparacoesForm";
import VeiculoTable from "@/components/veiculos_table";
import VeiculosPorClienteTable from "@/components/veiculos_por_cliente_table/index";
import MaterialUtilizadoTable from "@/components/material_utilizado_form/material_utilizado_table";

// Styles
import "./styles.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">DASHBOARD</h1>
      <div className="dashboard-container">
        <Card title="Clientes">
          <ClienteTable />
        </Card>
        <Card title="Veículos">
          <VeiculoTable />
        </Card>
        <Card title="Veículos associados a Clientes">
          <VeiculosPorClienteTable />
        </Card>
        <Card title="Materiais Utilizados">
          <MaterialUtilizadoTable />
        </Card>

      </div>
      <div className="reparacao-wrapper">
        <ReparacaoForm />
      </div>
    </div>
  );
};

export default Dashboard;
