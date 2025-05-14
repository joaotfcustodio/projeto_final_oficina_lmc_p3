// src/components/reparacoes_form/ReparacaoTable.jsx
import { useState } from "react";
import "./ReparacoesForm.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const ReparacaoTable = () => {
  const [filtro, setFiltro] = useState("");

  const reparacoes = [
    {
      id: "#256",
      matricula: "78-44-GT",
      preco: "900 €",
    },
    {
      id: "#257",
      matricula: "11-AA-22",
      preco: "750 €",
    },
  ];

  const reparacoesFiltradas = filtro
    ? reparacoes.filter((r) =>
        r.matricula.toLowerCase().includes(filtro.toLowerCase())
      )
    : reparacoes;

  return (
    <div className="reparacao-card">
      <div className="reparacao-header">
        <h5>Reparações</h5>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Filtrar por matrícula"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button title="Procurar">
            <SearchIcon />
          </button>
        </div>
      </div>

      <table className="reparacao-table">
        <thead>
          <tr>
            <th>ID Reparação</th>
            <th>Matrícula</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reparacoesFiltradas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.matricula}</td>
              <td>{r.preco}</td>
              <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button title="Adicionar">
                  <EditIcon />
                </button>
                <button title="Eliminar">
                  <DeleteIcon color="error" />
                </button>
                <div style={{ display: "flex", flexDirection: "column", fontSize: "0.85rem" }}>
                  <span>✔ Pintura geral</span>
                  <span>✔ Polimento parcial</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="reparacao-servicos">
        <div>
          <label><input type="checkbox" /> Pintura geral</label>
          <label><input type="checkbox" /> Pintura de pára-choques dianteiro</label>
          <label><input type="checkbox" /> Pintura de pára-choques traseito</label>
          <label><input type="checkbox" /> Pintura de capô</label>
          <label><input type="checkbox" /> Pintura de tejadilho</label>
        </div>
        <div>
          <label><input type="checkbox" /> Pintura de guarda-lamas esquerdo da frente</label>
          <label><input type="checkbox" /> Pintura de guarda-lamas direito da frente</label>
          <label><input type="checkbox" /> Pintura de guarda-lamas esquerdo de trás</label>
          <label><input type="checkbox" /> Pintura de guarda-lamas direito de trás</label>
        </div>
        <div>
          <label><input type="checkbox" /> Pintura de jantes</label>
          <label><input type="checkbox" /> Pintura de embaladeiras</label>
          <label><input type="checkbox" /> Pintura de capas de espelho</label>
          <label><input type="checkbox" /> Pintura de porta-bagagens</label>
        </div>
        <div>
          <label><input type="checkbox" /> Polimento geral</label>
          <label><input type="checkbox" /> Polimento parcial</label>
          <label><input type="checkbox" /> Polimento geral profundo</label>
        </div>
        <div>
          <label><input type="checkbox" /> Restauro de peças plásticas</label>
          <label><input type="checkbox" /> Restauro de peças metálicas</label>
          <label><input type="checkbox" /> Bate-chapa</label>
        </div>
        <div>
          <label><input type="checkbox" /> Pintura porta esquerda da frente</label>
          <label><input type="checkbox" /> Pintura porta esquerda de trás</label>
          <label><input type="checkbox" /> Pintura porta direita da frente</label>
          <label><input type="checkbox" /> Pintura porta direita de trás</label>
        </div>
      </div>
    </div>
  );
};

export default ReparacaoTable;
