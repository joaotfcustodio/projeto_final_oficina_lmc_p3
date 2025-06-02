import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import "./styles.css";

const VeiculoTable = ({ onEdit, reloadSignal }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);

  useEffect(() => {
    if (reloadSignal !== undefined) {
      listarTodosVeiculos();
    }
  }, [reloadSignal]);

  const listarTodosVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/veiculos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data.data || [];

      setVeiculos(data);
      setResultado(data); // mostra todos ao clicar no botão
      setMostrarTodos(true); // ativa modo "mostrar todos"
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  // Atualiza resultado com base no filtro (exceto se mostrarTodos estiver ativo)
  useEffect(() => {
    if (!mostrarTodos) {
      if (!filtro.trim()) {
        setResultado([]); // tabela vazia até começar a escrever
        return;
      }

      const filtrados = veiculos.filter((v) =>
        v.matricula.toLowerCase().includes(filtro.toLowerCase())
      );
      setResultado(filtrados);
    }
  }, [filtro, veiculos, mostrarTodos]);

  const handleEliminar = async (matricula) => {
    if (!window.confirm("Tem a certeza que deseja eliminar este veículo?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/veiculos/${matricula}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await listarTodosVeiculos(); // após eliminar, volta a listar todos
    } catch (error) {
      alert("Erro ao eliminar veículo.");
    }
  };

  return (
    <div className="veiculos-card">
      <div className="veiculos-header">
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Filtrar por matrícula"
            value={filtro}
            onChange={(e) => {
              setFiltro(e.target.value);
              setMostrarTodos(false); // volta a filtrar
            }}
          />
          <Button onClick={listarTodosVeiculos}>Listar Todos</Button>
        </div>
      </div>

      <div className="veiculos-scroll-container">
        <table className="veiculos-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Cor</th>
              <th>Ano</th>
              <th>NIF do Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {resultado.length > 0 ? (
              resultado.map((v, index) => (
                <tr key={index}>
                  <td>{v.matricula}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.cor}</td>
                  <td>{v.ano}</td>
                  <td>
                    {v.clientes?.length > 0
                      ? v.clientes.map((c) => c.nif).join(", ")
                      : "—"}
                  </td>
                  <td>
                    <div className="veiculo-actions">
                      <Button
                        className="veiculo-button"
                        title="Editar"
                        variant="icon"
                        onClick={() => onEdit?.(v)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        className="veiculo-button"
                        title="Eliminar"
                        variant="icon"
                        theme="secondary"
                        onClick={() => handleEliminar(v.matricula)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Nenhum veículo encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VeiculoTable;
