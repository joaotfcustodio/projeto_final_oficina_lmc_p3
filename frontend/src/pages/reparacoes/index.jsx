// src/pages/reparacoes/index.jsx
import React, { useState } from "react";

// Components
import AdicionarReparacao from "@/components/reparacoes_form/adicionarReparacao";
import Card from "@/components/card";
import ReparacaoForm from "@/components/reparacoes_form/ReparacoesForm";

// Styles
import "./styles.css";

const ReparacoesPage = () => {
  const [reparacoes, setReparacoes] = useState([]);

  const handleAdicionarReparacao = (novaReparacao) => {
    setReparacoes((prev) => [...prev, novaReparacao]);
  };

  return (
    <div className="reparacoes-page">
      <h1 className="reparacoes-title">
        ÁREA DE REPARAÇÕES
      </h1>
      <div className="reparacoes-container">
        <Card title="Adicionar Reparação">
          <AdicionarReparacao onAdicionar={handleAdicionarReparacao} />
        </Card>
        <Card title="Reparações">
          <ReparacaoForm reparacoesExternas={reparacoes} />
        </Card>
      </div>
    </div>
  );
};

export default ReparacoesPage;
