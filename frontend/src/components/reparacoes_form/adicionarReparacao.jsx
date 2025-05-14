import { useState } from "react";
import "./ReparacoesForm.css";

const servicosDisponiveis = [
  "Pintura geral",
  "Pintura de pára-choques dianteiro",
  "Pintura de pára-choques traseito",
  "Pintura de capô",
  "Pintura de tejadilho",
  "Pintura de guarda-lamas esquerdo da frente",
  "Pintura de guarda-lamas direito da frente",
  "Pintura de guarda-lamas esquerdo de trás",
  "Pintura de guarda-lamas direito de trás",
  "Pintura de jantes",
  "Pintura de embaladeiras",
  "Pintura de capas de espelho",
  "Pintura de porta-bagagens",
  "Polimento geral",
  "Polimento parcial",
  "Polimento geral profundo",
  "Restauro de peças plásticas",
  "Restauro de peças metálicas",
  "Bate-chapa",
  "Pintura porta esquerda da frente",
  "Pintura porta esquerda de trás",
  "Pintura porta direita da frente",
  "Pintura porta direita de trás",
];

const AdicionarReparacao = ({ onAdicionar }) => {
  const [matricula, setMatricula] = useState("");
  const [preco, setPreco] = useState("");
  const [servicosSelecionados, setServicosSelecionados] = useState([]);

  const handleCheckboxChange = (servico) => {
    setServicosSelecionados((prev) =>
      prev.includes(servico)
        ? prev.filter((s) => s !== servico)
        : [...prev, servico]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaReparacao = {
      id: `#${Math.floor(Math.random() * 1000)}`,
      matricula,
      preco: preco + " €",
      servicos: servicosSelecionados,
    };
    onAdicionar(novaReparacao);
    setMatricula("");
    setPreco("");
    setServicosSelecionados([]);
  };

  return (
    <form className="reparacao-form" onSubmit={handleSubmit}>
      <h5>Adicionar Reparação</h5>
      <input
        type="text"
        placeholder="Matrícula do veículo"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço em euros"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
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
      <button type="submit">Guardar Reparação</button>
    </form>
  );
};

export default AdicionarReparacao;
