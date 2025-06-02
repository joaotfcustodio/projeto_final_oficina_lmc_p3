import { useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "./styles.css";

const formatWithUnit = (value, unit) => {
  return value || value === 0 ? `${value} ${unit}` : "—";
};

const calcularPrecoTotalMaterial = (material) => {
  const parsePreco = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  const total =
    parsePreco(material.preco_tinta_carro) +
    parsePreco(material.preco_verniz_carro) +
    parsePreco(material.preco_tinta_jantes) +
    parsePreco(material.preco_gasoleo_estufa_lt);

  return total.toFixed(2);
};

const MaterialUtilizadoTable = ({ materiais, onEditar, carregarMaterialPorId }) => {
  const [filtro, setFiltro] = useState("");

  const procurarMaterialPorId = async () => {
    if (!filtro.trim()) return;
    await carregarMaterialPorId(filtro); // chama função do pai
  };

  const eliminarMaterial = async (id_reparacao) => {
    if (!window.confirm("Deseja eliminar este material utilizado?")) return;

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.delete(
        `http://localhost:5000/api/v1/materiais/${id_reparacao}`,
        { headers }
      );

      alert("Material eliminado com sucesso!");
      await carregarMaterialPorId(id_reparacao); // recarrega para limpar a tabela se necessário
    } catch (err) {
      console.error("Erro ao eliminar material:", err);
      alert("Erro ao eliminar material.");
    }
  };

  return (
    <>
      <div className="materiais-header">
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Input
            type="text"
            placeholder="Filtrar por ID de reparação"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <Button title="Procurar" variant="icon" onClick={procurarMaterialPorId}>
            <SearchIcon style={{ height: "1.25rem", width: "1.25rem" }} />
          </Button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="materiais-table" style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID Reparacão</th>
              <th>Matrícula</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Marca Tinta</th>
              <th>Qtd. Tinta (L)</th>
              <th>Qtd. Tinta Jantes (L)</th>
              <th>Qtd. Verniz (L)</th>
              <th>Qtd. Gasóleo Estufa (L)</th>
              <th>Marca Verniz</th>
              <th>Massa de Polimento (kg)</th>
              <th>Preço Tinta Carro (€)</th>
              <th>Preço Verniz Carro (€)</th>
              <th>Preço Tinta Jantes (€)</th>
              <th>Preço Gásóleo Estufa (€)</th>
              <th>Preço Total do Material (€)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {materiais.length === 0 ? (
              <tr>
                <td colSpan="17" style={{ textAlign: "center" }}>Nenhum material encontrado.</td>
              </tr>
            ) : (
              materiais.map((m, index) => {
                const veiculo = m.Reparacao?.Veiculo || {};

                return (
                  <tr key={index}>
                    <td>#{m.id_reparacao}</td>
                    <td>{veiculo.matricula || "—"}</td>
                    <td>{veiculo.marca || "—"}</td>
                    <td>{veiculo.modelo || "—"}</td>
                    <td>{m.marca_tinta || "—"}</td>
                    <td>{formatWithUnit(m.quantidade_tinta, "L")}</td>
                    <td>{formatWithUnit(m.quantidade_tinta_jantes, "L")}</td>
                    <td>{formatWithUnit(m.quantidade_verniz, "L")}</td>
                    <td>{formatWithUnit(m.quantidade_gasoleo_estufa, "L")}</td>
                    <td>{m.marca_verniz || "—"}</td>
                    <td>{formatWithUnit(m.massa_polimento, "kg")}</td>
                    <td>{formatWithUnit(m.preco_tinta_carro, "€")}</td>
                    <td>{formatWithUnit(m.preco_verniz_carro, "€")}</td>
                    <td>{formatWithUnit(m.preco_tinta_jantes, "€")}</td>
                    <td>{formatWithUnit(m.preco_gasoleo_estufa_lt, "€")}</td>
                    <td>{formatWithUnit(calcularPrecoTotalMaterial(m), "€")}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.625rem" }}>
                        <Button
                          title="Editar"
                          variant="icon"
                          onClick={() => onEditar(m)}
                        >
                          <EditIcon style={{ height: "1.25rem", width: "1.25rem" }} />
                        </Button>
                        <Button
                          title="Eliminar"
                          variant="icon"
                          theme="secondary"
                          onClick={() => eliminarMaterial(m.id_reparacao)}
                        >
                          <DeleteIcon
                            color="error"
                            style={{ height: "1.25rem", width: "1.25rem" }}
                          />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MaterialUtilizadoTable;
