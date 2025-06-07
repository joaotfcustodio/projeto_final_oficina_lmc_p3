import React, { useState } from "react";

import AdicionarReparacao from "@/components/reparacoes_form/adicionarReparacao";
import ReparacaoForm from "@/components/reparacoes_form/ReparacoesForm";
import Card from "@/components/card";

import "./styles.css";

const ReparacoesPage = () => {
  const [reparacaoSelecionada, setReparacaoSelecionada] = useState(null);
  const [matriculaAtual, setMatriculaAtual] = useState("");
  const [reload, setReload] = useState(false);

  const handleAtualizarTabela = () => {
    setReparacaoSelecionada(null);
    setReload(prev => !prev); // Altera o estado para forçar o reload
  };

  return (
    <div className="reparacoes-page">
  
      <h1 className="reparacoes-title">ÁREA DE REPARAÇÕES</h1>

      <div className="reparacoes-container">
        <Card title={reparacaoSelecionada ? "Editar Reparação" : "Adicionar Reparação"}>
          <AdicionarReparacao
            onAtualizarTabela={handleAtualizarTabela}
            reparacaoSelecionada={reparacaoSelecionada}
            onCancelEdit={() => setReparacaoSelecionada(null)}
          />
        </Card>

        <Card title="Reparações">
          <ReparacaoForm
            onEditar={setReparacaoSelecionada}
            matriculaFiltro={matriculaAtual}
            setMatriculaFiltro={setMatriculaAtual}
            reloadSignal={reload}
          />
        </Card>
      </div>
    </div>
  );
};

export default ReparacoesPage;
