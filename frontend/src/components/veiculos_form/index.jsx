import { useState } from "react";
import axios from "axios";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

const VeiculoForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    nif: "",
    marca: "",
    modelo: "",
    matricula: "",
    ano: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/veiculos", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onCreated?.();
      setForm({
        nif: "",
        marca: "",
        modelo: "",
        matricula: "",
        ano: "",
      });
    } catch {
      alert("Erro ao adicionar veículo.");
    }
  };

  return (
    <form className="veiculos-form" onSubmit={handleSubmit}>
      <Input
        name="nif"
        value={form.nif}
        onChange={handleChange}
        placeholder="NIF do Cliente"
      />
      <Input
        name="marca"
        value={form.marca}
        onChange={handleChange}
        placeholder="Marca"
      />
      <Input
        name="modelo"
        value={form.modelo}
        onChange={handleChange}
        placeholder="Modelo"
      />
      <Input
        name="matricula"
        value={form.matricula}
        onChange={handleChange}
        placeholder="Matrícula"
      />
      <Input
        type="number"
        name="ano"
        value={form.ano}
        onChange={handleChange}
        placeholder="Ano"
      />
      <div className="btn-group">
        <Button
          type="submit"
        >
          Adicionar
        </Button>
        <Button
          theme="secondary"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default VeiculoForm;
