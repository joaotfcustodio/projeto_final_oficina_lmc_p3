import { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

// Styles
import "./styles.css";

const ClienteTable = ({ onEditar, onUpdated }) => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/clientes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClientes(res.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const handleProcurar = () => {
    const clienteEncontrado = clientes.filter((v) =>
      v.nif.toLowerCase().includes(filtro.toLowerCase())
    );
    setClientes(clienteEncontrado);
  };

  const handleEditar = (cliente) => {
    onEditar?.(cliente);
  };

  const handleEliminar = async (nif) => {
    const confirm = window.confirm("Tens a certeza que queres eliminar este cliente?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/v1/clientes/${nif}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onUpdated?.();
    } catch (error) {
      alert("Erro ao eliminar cliente.");
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nif.includes(filtro)
  );

  return (
    <>
      <div className="clientes-controls">
        <Input
          type="text"
          placeholder="Filtrar por NIF"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <Button onClick={handleProcurar}>Procurar</Button>
      </div>

      <table className="clientes-table">
        <thead>
          <tr>
            <th>NIF</th>
            <th>Nome</th>
            <th>Data Registo</th>
            <th>Morada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((c) => (
            <tr key={c.nif}>
              <td>{c.nif}</td>
              <td>{c.nome}</td>
              <td>{new Date(c.data_registo).toLocaleDateString("pt-PT")}</td>
              <td>{c.morada}</td>
              <td>
                <div className="reparacao-actions">
                  <Button
                    className="reparacao-button"
                    title="Editar"
                    variant="icon"
                    onClick={() => handleEditar(c)}
                  >
                    <EditIcon style={{ width: 20, height: 20 }} />
                  </Button>
                  <Button
                    className="reparacao-button"
                    title="Eliminar"
                    variant="icon"
                    theme="secondary"
                    onClick={() => handleEliminar(c.nif)}
                  >
                    <DeleteIcon
                      style={{ width: 20, height: 20 }}
                      color="error"
                    />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClienteTable;
