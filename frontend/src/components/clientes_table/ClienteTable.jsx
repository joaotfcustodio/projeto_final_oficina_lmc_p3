// src/components/clientes/ClienteTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./ClienteTable.css";

const ClienteTable = () => {
  const [clientes, setClientes] = useState([]);
  const [filtro, setFiltro] = useState("");

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
    } catch (err) {
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

  return (
    <div className="clientes-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h5>Clientes</h5>
        <input
          type="text"
          placeholder="Filtrar por NIF"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            border: "1px solid #ccc",
            padding: "5px 10px",
            borderRadius: "6px",
          }}
        />
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
    </div>
  );
};

export default ClienteTable;
