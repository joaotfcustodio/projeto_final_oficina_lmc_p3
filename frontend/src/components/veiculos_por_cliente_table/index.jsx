import { useState } from "react";
import axios from "axios";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import SearchIcon from "@mui/icons-material/Search";
import "./styles.css";

const VeiculosPorClienteTable = () => {
  const [nifBusca, setNifBusca] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const procurarVeiculos = async () => {
    setErro("");
    setResultado(null);

    if (!nifBusca.trim()) {
      setErro("Por favor, introduza um NIF.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/v1/clientes/${nifBusca}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResultado(res.data.data);
    } catch (err) {
      setErro("Cliente não encontrado ou erro ao buscar dados.");
    }
  };

  return (
    <div className="clientes-card">
      <h5>Procurar Veículos por Cliente</h5>

      <div className="veiculos-header" style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem" }}>
        <Input
          placeholder="Introduza o NIF do cliente"
          value={nifBusca}
          onChange={(e) => setNifBusca(e.target.value)}
        />
        <Button onClick={procurarVeiculos} title="Procurar">
          <SearchIcon />
        </Button>
      </div>

      {erro && (
        <div style={{ color: "#b00020", marginBottom: "1rem" }}>{erro}</div>
      )}

      {resultado ? (
        <>
          <p><strong>Cliente:</strong> {resultado.nome} ({resultado.nif})</p>
          {resultado.veiculos && resultado.veiculos.length > 0 ? (
            <div className="veiculos-scroll-container">
              <div className="veiculos-nif-scroll-container">
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
              </div>
            </div>
          ) : (
            <p>Este cliente não tem veículos associados.</p>
          )}
        </>
      ) : null}
    </div>
  );
};

export default VeiculosPorClienteTable;
