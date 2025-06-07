import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "./ReparacoesForm.css";

const servicosMap = {
  "Pintura geral": "pintura_geral",
  "Pintura de pára-choques dianteiro": "pintura_de_para_choques_dianteiro",
  "Pintura de pára-choques traseito": "pintura_de_para_choques_traseiro",
  "Pintura de capô": "pintura_de_capot",
  "Pintura de tejadilho": "pintura_de_tejadilho",
  "Pintura de guarda-lamas esquerdo da frente": "pintura_de_guarda_lamas_esquerdo_da_frente",
  "Pintura de guarda-lamas direito da frente": "pintura_de_guarda_lamas_direito_da_frente",
  "Pintura de guarda-lamas esquerdo de trás": "pintura_de_guarda_lamas_esquerdo_de_tras",
  "Pintura de guarda-lamas direito de trás": "pintura_de_guarda_lamas_direito_de_tras",
  "Pintura de jantes": "pintura_de_jantes",
  "Pintura de embaladeiras": "pintura_de_embaladeiras",
  "Pintura de capas de espelho": "pintura_de_capas_de_espelho",
  "Pintura de porta-bagagens": "pintura_de_porta_bagagens",
  "Polimento geral": "polimento_geral",
  "Polimento parcial": "polimento_parcial",
  "Polimento geral profundo": "polimento_geral_profundo",
  "Restauro de peças plásticas": "restauro_de_pecas_plasticas",
  "Restauro de peças metálicas": "restauro_de_pecas_metalicas",
  "Bate-chapa": "bate_chapa",
  "Pintura porta esquerda da frente": "pintura_de_porta_esquerda_da_frente",
  "Pintura porta esquerda de trás": "pintura_de_porta_esquerda_de_tras",
  "Pintura porta direita da frente": "pintura_de_porta_direita_da_frente",
  "Pintura porta direita de trás": "pintura_de_porta_direita_de_tras",
};

const servicosDisponiveis = Object.keys(servicosMap);

const AdicionarReparacao = ({ onAtualizarTabela, reparacaoSelecionada, onCancelEdit }) => {
  const [matricula, setMatricula] = useState("");
  const [preco, setPreco] = useState("");
  const [servicosSelecionados, setServicosSelecionados] = useState([]);
  const [mensagem, setMensagem] = useState(null);

  useEffect(() => {
    if (reparacaoSelecionada) {
      setMatricula(reparacaoSelecionada.matricula);
      setPreco(reparacaoSelecionada.preco);
      const ativos = Object.entries(servicosMap)
        .filter(([_, campo]) => reparacaoSelecionada[campo])
        .map(([label]) => label);
      setServicosSelecionados(ativos);
    } else {
      limparFormulario();
    }
  }, [reparacaoSelecionada]);

  const limparFormulario = () => {
    setMatricula("");
    setPreco("");
    setServicosSelecionados([]);
    setMensagem(null);
    onCancelEdit?.();
  };

  const handleCheckboxChange = (servico) => {
    setServicosSelecionados((prev) =>
      prev.includes(servico)
        ? prev.filter((s) => s !== servico)
        : [...prev, servico]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);

    const novaReparacao = {
      matricula: matricula.trim(),
      preco: parseFloat(preco),
    };

    Object.values(servicosMap).forEach((campo) => {
      novaReparacao[campo] = false;
    });

    servicosSelecionados.forEach((servico) => {
      const campo = servicosMap[servico];
      if (campo) novaReparacao[campo] = true;
    });

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      if (reparacaoSelecionada) {
        await axios.put(
          `http://localhost:5000/api/v1/reparacoes/${reparacaoSelecionada.id_reparacao}`,
          novaReparacao,
          { headers }
        );
        setMensagem("Reparação atualizada com sucesso!");
      } else {
        await axios.post("http://localhost:5000/api/v1/reparacoes", novaReparacao, { headers });
        setMensagem("Reparação adicionada com sucesso!");
      }

      onAtualizarTabela?.();
      limparFormulario();
    } catch (err) {
      console.error("Erro ao submeter reparação:", err);
      if (err.response?.status === 404) {
        setMensagem("Matrícula não se encontra na base de dados.");
      } else {
        setMensagem("Erro ao submeter reparação.");
      }
    }
  };

  return (
    <form className="reparacao-form" onSubmit={handleSubmit}>
      <div className="reparacao-form-inputs">
        <label>
          <b>Matrícula*</b>
          <Input
            type="text"
            placeholder="Matrícula do veículo"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
            disabled={!!reparacaoSelecionada}
          />
        </label>

        <label>
          Preço
          <Input
            type="number"
            placeholder="Preço em euros"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="checkbox-grid">
        {servicosDisponiveis.map((servico) => (
          <label key={servico}>
            <input
              type="checkbox"
              checked={servicosSelecionados.includes(servico)}
              onChange={() => handleCheckboxChange(servico)}
            />
            {servico}
          </label>
        ))}
      </div>

      {mensagem && (
        <div
          style={{
            margin: "1rem 0",
            backgroundColor: mensagem.includes("sucesso") ? "#d4edda" : "#f8d7da",
            color: mensagem.includes("sucesso") ? "#155724" : "#721c24",
            padding: "0.75rem",
            borderRadius: "0.5rem",
          }}
        >
          {mensagem}
        </div>
      )}

      <div className="reparacao-actions">
        <div className="reparacao-button">
          <Button type="submit">
            {reparacaoSelecionada ? "Atualizar Reparação" : "Adicionar Reparação"}
          </Button>
        </div>
        {reparacaoSelecionada && (
          <div className="reparacao-button">
            <Button type="button" theme="secondary" onClick={limparFormulario}>
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default AdicionarReparacao;
