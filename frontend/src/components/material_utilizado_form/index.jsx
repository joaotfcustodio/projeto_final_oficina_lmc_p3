import { useState } from "react";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

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
  };

  return (
    <form className="material-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <Input name="id_reparacao" placeholder="ID Reparação" onChange={handleChange} required />
        <Input name="marca_tinta" placeholder="Marca da Tinta" onChange={handleChange} />
        <Input name="marca_verniz" placeholder="Marca do Verniz" onChange={handleChange} />
        <Input name="preco_tinta_carro" placeholder="Preço Tinta Carro (€)" onChange={handleChange} />
        <Input name="preco_tinta_jantes" placeholder="Preço Tinta Jantes (€)" onChange={handleChange} />
        <Input name="preco_verniz_carro" placeholder="Preço Verniz Carro (€)" onChange={handleChange} />
        <Input name="quantidade_tinta" placeholder="Qtd Tinta (L)" onChange={handleChange} />
        <Input name="quantidade_tinta_jantes" placeholder="Qtd Tinta Jantes (L)" onChange={handleChange} />
        <Input name="quantidade_verniz" placeholder="Qtd Verniz (L)" onChange={handleChange} />
        <Input name="massa_polimento" placeholder="Massa Polimento (kg)" onChange={handleChange} />
        <Input name="quantidade_gasoleo_estufa" placeholder="Qtd Gasóleo Estufa (L)" onChange={handleChange} />
        <Input name="preco_gasoleo_estufa_lt" placeholder="Preço Gasóleo/L" onChange={handleChange} />
        <Input name="preco_total_material_carro" placeholder="Preço Total Material (€)" onChange={handleChange} />
      </div>
      <Button type="submit">Adicionar</Button>
    </form>
  );
};

export default MaterialUtilizadoForm;
