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
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/veiculos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVeiculos(res.data.data || []);
      setResultado(res.data.data || []);
    } catch {
      alert("Erro ao carregar veículos.");
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
            <>
              <tr>
                <td>12-AB-34</td>
                <td>Volkswagen</td>
                <td>Golf</td>
                <td>2018</td>
                <td>123456789</td>
              </tr>
              <tr>
                <td>56-CD-78</td>
                <td>Renault</td>
                <td>Clio</td>
                <td>2020</td>
                <td>987654321</td>
              </tr>
              <tr>
                <td>90-EF-12</td>
                <td>Peugeot</td>
                <td>208</td>
                <td>2022</td>
                <td>456123789</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VeiculoTable;
