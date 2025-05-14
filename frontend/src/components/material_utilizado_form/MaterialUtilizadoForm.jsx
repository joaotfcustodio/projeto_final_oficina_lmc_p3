import { useState } from "react";
import "./MaterialUtilizadoForm.css";

const MaterialUtilizadoForm = () => {
  const [form, setForm] = useState({
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", form);
    // Aqui podes fazer o POST para a API com axios
  };

  return (
    <form className="material-form" onSubmit={handleSubmit}>
      <h3>Adicionar Material Utilizado</h3>

      <div className="form-grid">
        <input name="id_reparacao" placeholder="ID Reparação" onChange={handleChange} required />
        <input name="marca_tinta" placeholder="Marca da Tinta" onChange={handleChange} />
        <input name="marca_verniz" placeholder="Marca do Verniz" onChange={handleChange} />
        <input name="preco_tinta_carro" placeholder="Preço Tinta Carro (€)" onChange={handleChange} />
        <input name="preco_tinta_jantes" placeholder="Preço Tinta Jantes (€)" onChange={handleChange} />
        <input name="preco_verniz_carro" placeholder="Preço Verniz Carro (€)" onChange={handleChange} />
        <input name="quantidade_tinta" placeholder="Qtd Tinta (L)" onChange={handleChange} />
        <input name="quantidade_tinta_jantes" placeholder="Qtd Tinta Jantes (L)" onChange={handleChange} />
        <input name="quantidade_verniz" placeholder="Qtd Verniz (L)" onChange={handleChange} />
        <input name="massa_polimento" placeholder="Massa Polimento (kg)" onChange={handleChange} />
        <input name="quantidade_gasoleo_estufa" placeholder="Qtd Gasóleo Estufa (L)" onChange={handleChange} />
        <input name="preco_gasoleo_estufa_lt" placeholder="Preço Gasóleo/L" onChange={handleChange} />
        <input name="preco_total_material_carro" placeholder="Preço Total Material (€)" onChange={handleChange} />
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default MaterialUtilizadoForm;
