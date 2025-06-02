import React, { useState } from "react";
import axios from "axios";

import Card from "@/components/card";
import MaterialUtilizadoForm from "@/components/material_utilizado_form";
import MaterialUtilizadoTable from "@/components/material_utilizado_form/material_utilizado_table";

import "./styles.css";

const MateriaisUtilizadosPage = () => {
  const [materialSelecionado, setMaterialSelecionado] = useState(null);
  const [materiais, setMateriais] = useState([]);

  const carregarMaterialPorId = async (id) => {
    if (!id) return;

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const res = await axios.get(
        `http://localhost:5000/api/v1/materiais/${id}`,
        { headers }
      );

      if (res.data?.material) {
        setMateriais([res.data.material]);
      } else {
        setMateriais([]);
      }
    } catch (err) {
      console.error("Erro ao buscar material:", err);
      setMateriais([]);
    }
  };

  return (
    <div className="materiais-utilizados-page">
      <h1 className="materiais-utilizados-title">
        ÁREA DE MATERIAIS UTILIZADOS
      </h1>

      <div className="materiais-utilizados-container">
        <Card title="Adicionar ou Editar Material Utilizado">
          <MaterialUtilizadoForm
            material={materialSelecionado}
            onSuccess={() => {
              if (materialSelecionado?.id_reparacao) {
                carregarMaterialPorId(materialSelecionado.id_reparacao);
              }
            }}
          />
        </Card>

        <Card title="Procurar Reparações e Material Utilizado">
          <MaterialUtilizadoTable
            materiais={materiais}
            onEditar={(mat) => setMaterialSelecionado(mat)}
            carregarMaterialPorId={carregarMaterialPorId}
          />
        </Card>
      </div>
    </div>
  );
};

export default MateriaisUtilizadosPage;
