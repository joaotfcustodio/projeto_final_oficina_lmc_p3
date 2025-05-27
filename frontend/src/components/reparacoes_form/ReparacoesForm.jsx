// src/components/reparacoes_form/ReparacaoForm.jsx
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import axios from "axios";
import "./ReparacoesForm.css";

const ReparacaoForm = ({
  reparacoesExternas = [],
  onEditar = () => {},
  matriculaFiltro,
  setMatriculaFiltro
}) => {
  const [mensagem, setMensagem] = useState(null);
  const [reparacoes, setReparacoes] = useState(reparacoesExternas);

  const [matriculaInterna, setMatriculaInterna] = useState("");
  const matricula = matriculaFiltro ?? matriculaInterna;
  const setMatricula = setMatriculaFiltro ?? setMatriculaInterna;

  const buscarReparacoes = async (matricula) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const res = await axios.get(
        `http://localhost:5000/api/v1/reparacoes/${matricula}`,
        { headers }
      );
      setReparacoes(res.data.reparacoes || []);
      setMensagem(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setMensagem("Matrícula não se encontra na base de dados.");
        setReparacoes([]);
      } else {
        setMensagem("Erro ao carregar reparações.");
      }
    }
  };

  const eliminarReparacao = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      await axios.delete(`http://localhost:5000/api/v1/reparacoes/${id}`, {
        headers,
      });
      setReparacoes((prev) => prev.filter((r) => r.id_reparacao !== id));
    } catch (err) {
      alert("Erro ao eliminar reparação.");
    }
  };

  const formatarCampo = (campo) => {
    return campo
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const reparacoesFiltradas = Array.isArray(reparacoes)
    ? reparacoes.filter(
        (r) => r.matricula.toLowerCase() === matricula.toLowerCase()
      )
    : [];

  return (
    <>
      <div className="reparacao-header">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Filtrar por matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <Button title="Procurar" variant="icon" onClick={() => buscarReparacoes(matricula)}>
            <SearchIcon style={{ height: "20px", width: "20px" }} />
          </Button>
        </div>
        {mensagem && (
          <div className="mensagem-erro" style={{ marginTop: "0.5rem" }}>
            {mensagem}
          </div>
        )}
      </div>
      <div className="reparacao-table-container">
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
              <tr key={r.id_reparacao}>
                <td>#{r.id_reparacao}</td>
                <td>{r.matricula}</td>
                <td>{r.preco} €</td>
                <td style={{ verticalAlign: "top" }}>
                  {Object.entries(r)
                    .filter(
                      ([campo, valor]) =>
                        typeof valor === "boolean" && valor === true
                    )
                    .map(([campo]) => (
                      <div key={campo}>✔ {formatarCampo(campo)}</div>
                    ))}
                </td>
                <td>
                  <div className="reparacao-actions">
                    <Button
                      className="reparacao-button"
                      title="Editar"
                      variant="icon"
                      onClick={() => onEditar(r)}
                    >
                      <EditIcon style={{ height: "20px", width: "20px" }} />
                    </Button>
                    <Button
                      className="reparacao-button"
                      title="Eliminar"
                      variant="icon"
                      theme="secondary"
                      onClick={() => eliminarReparacao(r.id_reparacao)}
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
      </div>
    </>
  );
};

export default ReparacaoForm;
