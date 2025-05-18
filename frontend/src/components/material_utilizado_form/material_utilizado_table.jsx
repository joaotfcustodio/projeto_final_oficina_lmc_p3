// src/components/materiais_utilizados/MaterialUtilizadoTable.jsx
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

const MaterialUtilizadoTable = () => {
  const [filtro, setFiltro] = useState("");

  const materiais = [
    {
      id_reparacao: "#256",
      marca_tinta: "Mipa",
      quantidade_tinta: "1.2 L",
      marca_verniz: "Cromax",
      quantidade_verniz: "0.6 L",
      quantidade_gasoleo_estufa: "4 L",
      preco_total: "550.00 €",
      preco_tinta_carro: "95.00 €",
      preco_verniz_carro: "110.00 €",
      preco_gasoleo_estufa: "6 €"
    },
    {
      id_reparacao: "#257",
      marca_tinta: "Sinnek",
      quantidade_tinta: "2.0 L",
      marca_verniz: "Sinnek",
      preco_total: "58.00 €",
    },
  ];

  const filtrados = filtro
    ? materiais.filter((m) =>
        m.id_reparacao.toLowerCase().includes(filtro.toLowerCase())
      )
    : materiais;

  return (
    <>
      <div className="materiais-header">
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Filtrar por ID de reparação"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <Button title="Procurar" variant="icon">
            <SearchIcon style={{ height: "20px", width: "20px" }} />
          </Button>
        </div>
      </div>

      <table className="materiais-table">
        <thead>
          <tr>
            <th>ID Reparação</th>
            <th>Marca Tinta</th>
            <th>Qtd. Tinta</th>
            <th>Qtd. Tinta Jantes</th>
            <th>Qtd. Verniz</th>
            <th>Qtd. Gasóleo Estufa</th>
            <th>Marca Verniz</th>
            <th>Massa de Polimento</th>
            <th>Preço Tinta Carro</th>
            <th>Preço Verniz Carro</th>
            <th>Preço Tinta Jantes</th>
            <th>Preço Gásoleo Estufa</th>
            <th>Preço Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((m, index) => (
            <tr key={index}>
              <td>{m.id_reparacao}</td>
              <td>{m.marca_tinta}</td>
              <td>{m.quantidade_tinta}</td>
              <td>{m.quantidade_tinta_jantes}</td>
              <td>{m.quantidade_verniz}</td>
              <td>{m.quantidade_gasoleo_estufa}</td>
              <td>{m.marca_verniz}</td>
              <td>{m.massa_polimento}</td>
              <td>{m.preco_tinta_carro}</td>
              <td>{m.preco_verniz_carro}</td>
              <td>{m.preco_tinta_jantes}</td>
              <td>{m.preco_gasoleo_estufa}</td>
              <td>{m.preco_total}</td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button title="Editar" variant="icon">
                    <EditIcon style={{ height: "20px", width: "20px" }} />
                  </Button>
                  <Button title="Eliminar" variant="icon" theme="secondary">
                    <DeleteIcon color="error" style={{ height: "20px", width: "20px" }} />
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

export default MaterialUtilizadoTable;
