import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@/components/card";
import ClienteTable from "@/components/clientes_table";
import ReparacaoForm from "@/components/reparacoes_form/ReparacoesForm";
import VeiculoTable from "@/components/veiculos_table";
import VeiculosPorClienteTable from "@/components/veiculos_por_cliente_table";
import MaterialUtilizadoTable from "@/components/material_utilizado_form/material_utilizado_table";

import "./styles.css";

const Dashboard = () => {
  const [materiais, setMateriais] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    carregarTodosMateriais();
  }, [reload]);

  const carregarTodosMateriais = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/material_utilizado", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data?.data || res.data || [];
      setMateriais(data);
    } catch (err) {
      console.error("Erro ao carregar materiais:", err);
    }
  };

  const carregarMaterialPorId = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/v1/materiais/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data?.material) {
        setMateriais([res.data.material]);
      } else {
        setMateriais([]);
      }
    } catch (err) {
      console.error("Erro ao buscar material por ID:", err);
      setMateriais([]);
    }
  };

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
          <MaterialUtilizadoTable
            materiais={materiais}
            carregarMaterialPorId={carregarMaterialPorId}
            onSuccess={() => setReload((prev) => !prev)}
          />
        </Card>

        <Card title="Lista de Reparações">
          <ReparacaoForm />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
