import { useState } from "react";
import axios from "axios";

// Components
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// Styles
import "./styles.css";

const ClienteForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    nome: "",
    morada: "",
    nif: "",
    contacto: "",
    data_registo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/clientes", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onCreated?.(); // atualizar tabela se necessário
      setForm({ nome: "", morada: "", nif: "", contacto: "", data_registo: "" });
    } catch {
      alert("Erro ao criar cliente.");
    }
  };

  return (
    <form className="clientes-form" onSubmit={handleSubmit}>
      <Input
        name="nif"
        value={form.nif}
        onChange={handleChange}
        placeholder="NIF"
      />
      <Input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome"
      />
      <Input
        type="date"
        name="data_registo"
        value={form.data_registo}
        onChange={handleChange}
      />
      <Input
        name="morada"
        value={form.morada}
        onChange={handleChange}
        placeholder="Morada"
      />
      <Input
        name="contacto"
        value={form.contacto}
        onChange={handleChange}
        placeholder="Contacto"
      />
      <div className="btn-group">
        <Button
          type="submit"
        >
            Adicionar
        </Button>
        <Button
          theme="secondary">
            Cancelar
        </Button>
      </div>
    </form>
  );
};

export default ClienteForm;
