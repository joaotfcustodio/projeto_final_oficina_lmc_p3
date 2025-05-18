// src/components/reparacoes_form/ReparacaoTable.jsx
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./ReparacoesForm.css";

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
    <>
      <div className="reparacao-header">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Filtrar por matrícula"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <Button title="Procurar" variant="icon">
            <SearchIcon style={{ height: "20px", width: "20px" }} />
          </Button>
        </div>
      </div>

      <table className="reparacao-table">
        <thead>
          <tr>
            <th>ID Reparação</th>
            <th>Matrícula</th>
            <th>Preço</th>
            <th>Lista de Reparações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reparacoesFiltradas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.matricula}</td>
              <td>{r.preco}</td>
              <td style={{ verticalAlign: "top" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ fontSize: "0.85rem", flex: 1 }}>
                    <span>✔ Pintura geral</span>
                    <br />
                    <span>✔ Polimento parcial</span>
                  </div>
                  
                </div>
              </td>
              <td>
              <div className="reparacao-actions">
                    <Button
                      className="reparacao-button"
                      title="Editar"
                      variant="icon"
                    >
                      <EditIcon style={{ height: "20px", width: "20px" }} />
                    </Button>
                    <Button
                      className="reparacao-button"
                      title="Eliminar"
                      variant="icon"
                      theme="secondary"
                    >
                      <DeleteIcon
                        style={{ height: "20px", width: "20px" }}
                        color="error"
                      />
                    </Button>
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="checkbox-grid">
        <label><input type="checkbox" /> Pintura geral</label>
        <label><input type="checkbox" /> Pintura de pára-choques dianteiro</label>
        <label><input type="checkbox" /> Pintura de pára-choques traseito</label>
        <label><input type="checkbox" /> Pintura de capô</label>
        <label><input type="checkbox" /> Pintura de tejadilho</label>
        <label><input type="checkbox" /> Pintura de guarda-lamas esquerdo da frente</label>
        <label><input type="checkbox" /> Pintura de guarda-lamas direito da frente</label>
        <label><input type="checkbox" /> Pintura de guarda-lamas esquerdo de trás</label>
        <label><input type="checkbox" /> Pintura de guarda-lamas direito de trás</label>
        <label><input type="checkbox" /> Pintura de jantes</label>
        <label><input type="checkbox" /> Pintura de embaladeiras</label>
        <label><input type="checkbox" /> Pintura de capas de espelho</label>
        <label><input type="checkbox" /> Pintura de porta-bagagens</label>
        <label><input type="checkbox" /> Polimento geral</label>
        <label><input type="checkbox" /> Polimento parcial</label>
        <label><input type="checkbox" /> Polimento geral profundo</label>
        <label><input type="checkbox" /> Restauro de peças plásticas</label>
        <label><input type="checkbox" /> Restauro de peças metálicas</label>
        <label><input type="checkbox" /> Bate-chapa</label>
        <label><input type="checkbox" /> Pintura porta esquerda da frente</label>
        <label><input type="checkbox" /> Pintura porta esquerda de trás</label>
        <label><input type="checkbox" /> Pintura porta direita da frente</label>
        <label><input type="checkbox" /> Pintura porta direita de trás</label>
      </div>
    </>
  );
};

export default ReparacaoTable;
