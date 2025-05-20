// src/components/veiculos_form/VeiculoTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

const VeiculoTable = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/veiculos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data.data || [];
      setVeiculos(data);
      setResultado(data);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      const dadosFicticios = [
        {
          matricula: "12-AB-34",
          marca: "Volkswagen",
          modelo: "Golf",
          ano: 2018,
          nif_cliente: "123456789",
        },
        {
          matricula: "56-CD-78",
          marca: "Renault",
          modelo: "Clio",
          ano: 2020,
          nif_cliente: "987654321",
        },
        {
          matricula: "90-EF-12",
          marca: "Peugeot",
          modelo: "208",
          ano: 2022,
          nif_cliente: "456123789",
        },
      ];
      setVeiculos(dadosFicticios);
      setResultado(dadosFicticios);
    }
  };

  const handleListarTodos = () => {
    setFiltro("");
    setResultado(veiculos);
  };

  const handleProcurar = () => {
    const veiculoEncontrado = veiculos.filter(
      (v) => v.matricula.toLowerCase() === filtro.toLowerCase()
    );
    setResultado(veiculoEncontrado);
  };

  return (
    <div className="veiculos-card">
      <div className="veiculos-header">
        <div className="veiculos-controls">
          <Input
            type="text"
            placeholder="Filtrar por matrícula"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <Button onClick={handleProcurar}>Procurar</Button>
          <Button onClick={handleListarTodos}>Listar Todos</Button>
        </div>
      </div>
      <table className="veiculos-table">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ano</th>
            <th>NIF do Cliente</th>
          </tr>
        </thead>
        <tbody>
          {resultado.length > 0 ? (
            resultado.map((v, index) => (
              <tr key={index}>
                <td>{v.matricula}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>{v.ano}</td>
                <td>{v.nif_cliente}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum veículo encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VeiculoTable;
