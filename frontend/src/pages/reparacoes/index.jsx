// src/pages/reparacoes/index.jsx
import React, { useState } from "react";
import Sidebar from "../../components/navbar";
import AdicionarReparacao from "../../components/reparacoes_form/adicionarReparacao";
import ReparacaoForm from "../../components/reparacoes_form/ReparacoesForm";

const ReparacoesPage = () => {
  const [reparacoes, setReparacoes] = useState([]);

  const handleAdicionarReparacao = (novaReparacao) => {
    setReparacoes((prev) => [...prev, novaReparacao]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>ÁREA DE REPARAÇÕES</h2>
        <AdicionarReparacao onAdicionar={handleAdicionarReparacao} />
        <ReparacaoForm reparacoesExternas={reparacoes} />
      </div>
    </div>
  );
};

export default ReparacoesPage;
