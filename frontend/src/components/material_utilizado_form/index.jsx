import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

const MaterialUtilizadoForm = ({ material }) => {
  const initialFormState = {
    id_reparacao: "",
    marca_tinta: "",
    marca_verniz: "",
    preco_tinta_carro: "",
    preco_tinta_jantes: "",
    preco_verniz_carro: "",
    quantidade_tinta: "",
    quantidade_tinta_jantes: "",
    quantidade_verniz: "",
    massa_polimento: "",
    quantidade_gasoleo_estufa: "",
    preco_gasoleo_estufa_lt: "",
    preco_total_material_carro: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    if (material) {
      setForm({ ...material });
      setModoEdicao(true);
    }
  }, [material]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm(initialFormState);
    setModoEdicao(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const payload = {
      ...form,
      id_reparacao: parseInt(form.id_reparacao),
      preco_tinta_carro: parseFloat(form.preco_tinta_carro),
      preco_tinta_jantes: parseFloat(form.preco_tinta_jantes),
      preco_verniz_carro: parseFloat(form.preco_verniz_carro),
      quantidade_tinta: parseFloat(form.quantidade_tinta),
      quantidade_tinta_jantes: parseFloat(form.quantidade_tinta_jantes),
      quantidade_verniz: parseFloat(form.quantidade_verniz),
      massa_polimento: parseFloat(form.massa_polimento),
      quantidade_gasoleo_estufa: parseFloat(form.quantidade_gasoleo_estufa),
      preco_gasoleo_estufa_lt: parseFloat(form.preco_gasoleo_estufa_lt),
      preco_total_material_carro: parseFloat(form.preco_total_material_carro),
    };

    if (isNaN(payload.id_reparacao)) {
      alert("O ID da reparação deve ser um número válido.");
      return;
    }

    try {
      if (modoEdicao) {
        await axios.put(
          `http://localhost:5000/api/v1/materiais/${payload.id_reparacao}`,
          payload,
          { headers }
        );
        alert("Material atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:5000/api/v1/materiais", payload, {
          headers,
        });
        alert("Material adicionado com sucesso!");
      }

      setForm(initialFormState);
      setModoEdicao(false);
    } catch (err) {
      console.error("Erro ao salvar material:", err);
      alert("Erro ao salvar material. Verifica os dados.");
    }
  };

  return (
    <form className="material-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <Input
          name="id_reparacao"
          placeholder="ID Reparação"
          onChange={handleChange}
          value={form.id_reparacao}
          type="number"
          required
          disabled={modoEdicao} // Evita alterar ID no modo de edição
        />
        <Input name="marca_tinta" placeholder="Marca da Tinta" onChange={handleChange} value={form.marca_tinta} />
        <Input name="marca_verniz" placeholder="Marca do Verniz" onChange={handleChange} value={form.marca_verniz} />
        <Input name="preco_tinta_carro" placeholder="Preço Tinta Carro (€)" onChange={handleChange} value={form.preco_tinta_carro} type="number" />
        <Input name="preco_tinta_jantes" placeholder="Preço Tinta Jantes (€)" onChange={handleChange} value={form.preco_tinta_jantes} type="number" />
        <Input name="preco_verniz_carro" placeholder="Preço Verniz Carro (€)" onChange={handleChange} value={form.preco_verniz_carro} type="number" />
        <Input name="quantidade_tinta" placeholder="Qtd Tinta (L)" onChange={handleChange} value={form.quantidade_tinta} type="number" />
        <Input name="quantidade_tinta_jantes" placeholder="Qtd Tinta Jantes (L)" onChange={handleChange} value={form.quantidade_tinta_jantes} type="number" />
        <Input name="quantidade_verniz" placeholder="Qtd Verniz (L)" onChange={handleChange} value={form.quantidade_verniz} type="number" />
        <Input name="massa_polimento" placeholder="Massa Polimento (kg)" onChange={handleChange} value={form.massa_polimento} type="number" />
        <Input name="quantidade_gasoleo_estufa" placeholder="Qtd Gasóleo Estufa (L)" onChange={handleChange} value={form.quantidade_gasoleo_estufa} type="number" />
        <Input name="preco_gasoleo_estufa_lt" placeholder="Preço Gasóleo/L" onChange={handleChange} value={form.preco_gasoleo_estufa_lt} type="number" />
        <Input name="preco_total_material_carro" placeholder="Preço Total Material (€)" onChange={handleChange} value={form.preco_total_material_carro} type="number" />
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <div className="button-group">
          <Button type="submit" className="small-button">
            {modoEdicao ? "Atualizar" : "Adicionar"}
          </Button>
          <Button type="button" theme="secondary" onClick={handleClear} className="small-button">
            Limpar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MaterialUtilizadoForm;
