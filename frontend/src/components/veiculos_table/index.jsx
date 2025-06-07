import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import "./styles.css";

const VeiculoTable = ({ onEdit, reloadSignal }) => {
  const [todosVeiculos, setTodosVeiculos] = useState([]);
  const [veiculosVisiveis, setVeiculosVisiveis] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    if (reloadSignal !== undefined) {
      obterTodosVeiculos();
    }
  }, [reloadSignal]);

  const obterTodosVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/veiculos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res.data.data || [];
      setTodosVeiculos(data);
      setVeiculosVisiveis(data);
      setFiltro("");
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
    }
  };

  useEffect(() => {
    if (filtro.trim() === "") {
      setVeiculosVisiveis([]);
      return;
    }

    const filtrados = todosVeiculos.filter((v) =>
      v.matricula.toLowerCase().includes(filtro.toLowerCase())
    );
    setVeiculosVisiveis(filtrados);
  }, [filtro, todosVeiculos]);

  const handleEliminar = async (matricula) => {
    if (!window.confirm("Tem a certeza que deseja eliminar este veículo?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/veiculos/${matricula}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await obterTodosVeiculos();
    } catch (error) {
      alert("Erro ao eliminar veículo.");
    }
  };

  return (
    <div className="veiculos-card">
      <div className="veiculos-header">
        <div className="veiculos-controls-row">
          <Input
            type="text"
            placeholder="Filtrar por matrícula"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <Button className="listar-btn" onClick={obterTodosVeiculos}>
            Listar Todos
          </Button>
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
            {(filtro.trim() === "" ? todosVeiculos : veiculosVisiveis).length > 0 ? (
              (filtro.trim() === "" ? todosVeiculos : veiculosVisiveis).map((v, index) => (
                <tr key={index}>
                  <td>{v.matricula}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.cor}</td>
                  <td>{v.ano}</td>
                  <td>{v.clientes?.map((c) => c.nif).join(", ") || "—"}</td>
                  <td>
                    <div className="veiculo-actions">
                      <Button variant="icon" title="Editar" onClick={() => onEdit?.(v)}>
                        <EditIcon />
                      </Button>
                      <Button
                        variant="icon"
                        theme="secondary"
                        title="Eliminar"
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
