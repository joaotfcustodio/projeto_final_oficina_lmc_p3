// src/components/clientes/ClienteTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

// Styles
import "./styles.css";

const ClienteTable = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/clientes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClientes(res.data.data || []);
    } catch {
      alert("Erro ao carregar clientes.");
    }
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nif.includes(filtro)
  );
// Dados fictícios se lista estiver vazia (para efeitos visuais)
if (clientes.length === 0) {
  setClientes([
    {
      nif: "123456789",
      nome: "Ana Silva",
      data_registo: "2024-05-14",
      morada: "Rua da Liberdade 12",
    },
    {
      nif: "987654321",
      nome: "Carlos Lopes",
      data_registo: "2023-12-01",
      morada: "Av. Central 45",
    },
  ]);
}
const handleProcurar = () => {
  const clienteEncontrado = clientes.filter(
    (v) => v.nif.toLowerCase() === filtro.toLowerCase()
  );
  setResultado(clienteEncontrado);
};

  return (
    <><div className="clientes-controls">
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
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((c) => (
            <tr key={c.nif}>
              <td>{c.nif}</td>
              <td>{c.nome}</td>
              <td>{new Date(c.data_registo).toLocaleDateString("pt-PT")}</td>
              <td>{c.morada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClienteTable;
