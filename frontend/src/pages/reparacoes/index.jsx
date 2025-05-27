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
  const [reparacaoSelecionada, setReparacaoSelecionada] = useState(null);
  const [matriculaAtual, setMatriculaAtual] = useState("");

  const handleAdicionarReparacao = (reparacaoAtualizada) => {
    setReparacoes((prev) => {
      const index = prev.findIndex(
        (r) => r.id_reparacao === reparacaoAtualizada.id_reparacao
      );
      if (index !== -1) {
        const copia = [...prev];
        copia[index] = reparacaoAtualizada;
        return copia;
      } else {
        return [...prev, reparacaoAtualizada];
      }
    });

    setReparacaoSelecionada(null);
  };

  return (
    <div className="reparacoes-page">
      <h1 className="reparacoes-title">ÁREA DE REPARAÇÕES</h1>
      <div className="reparacoes-container">
        <Card title="Adicionar Reparação">
          <AdicionarReparacao
            onAdicionar={handleAdicionarReparacao}
            reparacaoSelecionada={reparacaoSelecionada}
          />
        </Card>
        <Card title="Reparações">
          <ReparacaoForm
            reparacoesExternas={reparacoes}
            onEditar={setReparacaoSelecionada}
            matriculaFiltro={matriculaAtual}
            setMatriculaFiltro={setMatriculaAtual}
          />
        </Card>
      </div>
    </div>
  );
};

export default ReparacoesPage;
