import { useState } from "react";

import Card from "@/components/card";
import VeiculoForm from "@/components/veiculos_form";
import VeiculoTable from "@/components/veiculos_table";
import VeiculosPorClienteTable from "@/components/veiculos_por_cliente_table";

import "./styles.css";

const VeiculosPage = () => {
  const [veiculoEditavel, setVeiculoEditavel] = useState(null);
  const [refresh, setRefrescar] = useState(false);

  const atualizarLista = () => setRefrescar((prev) => !prev);

  return (
    <div className="veiculos-page">
      <h1 className="veiculos-title">ÁREA DE VEÍCULOS</h1>

      <div className="veiculos-grid">
        <div className="form-column">
          <Card title={veiculoEditavel ? "Editar Veículo" : "Adicionar Veículo"}>
            <VeiculoForm
              veiculoEditavel={veiculoEditavel}
              onCreated={atualizarLista}
              onCancelEdit={() => setVeiculoEditavel(null)}
            />
          </Card>
        </div>

        <div className="table-column">
          <Card title="Lista de Veículos">
            <VeiculoTable
              onEdit={(veiculo) => setVeiculoEditavel(veiculo)}
              reloadSignal={refresh}
            />
          </Card>

          <div className="cliente-veiculos-wrapper">
            <Card title="Lista de Veículos associados a Clientes">
              <VeiculosPorClienteTable reloadSignal={refresh} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VeiculosPage;
