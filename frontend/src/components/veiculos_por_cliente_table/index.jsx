// src/components/veiculos/VeiculosPorClienteTable.jsx
import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import SearchIcon from "@mui/icons-material/Search";


import "./styles.css";

const dados = [
  {
    nif: "123456789",
    nome: "Joana Silva",
    veiculos: [
      { matricula: "00-AA-00", marca: "Renault", modelo: "Clio", ano: 2018 },
      { matricula: "11-BB-11", marca: "Volkswagen", modelo: "Golf", ano: 2020 },
      { matricula: "22-CC-22", marca: "Fiat", modelo: "Punto", ano: 2015 },
    ],
  },
  {
    nif: "987654321",
    nome: "Carlos Santos",
    veiculos: [
      { matricula: "37-DA-83", marca: "BMW", modelo: "320d", ano: 2017 },
      { matricula: "44-EW-56", marca: "Seat", modelo: "Ibiza", ano: 2016 },
      { matricula: "12-GT-68", marca: "Audi", modelo: "A3", ano: 2019 },
    ],
  },
];

const VeiculosPorClienteTable = () => {
  const [nifBusca, setNifBusca] = useState("");
  const [resultado, setResultado] = useState(null);

  const procurarVeiculos = () => {
    const cliente = dados.find((c) => c.nif === nifBusca);
    setResultado(cliente);
  };

  return (
    <div className="clientes-card">
      <h5>Procurar Veículos por Cliente</h5>
      <div className="veiculos-header">
        <Input
          placeholder="Introduza o NIF do cliente"
          value={nifBusca}
          onChange={(e) => setNifBusca(e.target.value)}
        />
        <Button onClick={procurarVeiculos} title="Procurar">
          <SearchIcon />
        </Button>
      </div>

      {resultado ? (
        <>
          <p><strong>Cliente:</strong> {resultado.nome} ({resultado.nif})</p>
          <table className="veiculos-table">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Ano</th>
              </tr>
            </thead>
            <tbody>
              {resultado.veiculos.map((v, idx) => (
                <tr key={idx}>
                  <td>{v.matricula}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Nenhum cliente encontrado ou sem NIF inserido.</p>
      )}
    </div>
  );
};

export default VeiculosPorClienteTable;
