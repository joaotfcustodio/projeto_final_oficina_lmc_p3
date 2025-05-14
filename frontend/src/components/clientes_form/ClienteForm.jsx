// src/components/clientes/ClienteForm.jsx
import { useState } from "react";
import axios from "axios";
import "./ClientesForm.css";

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
    } catch (err) {
      alert("Erro ao criar cliente.");
    }
  };

  return (
    <div className="clientes-card">
      <h5 className="form-title">Adicionar Cliente</h5>
      <form className="clientes-form" onSubmit={handleSubmit}>
        <input
          className="clientes-input"
          name="nif"
          value={form.nif}
          onChange={handleChange}
          placeholder="NIF"
        />
        <input
          className="clientes-input"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          className="clientes-input"
          type="date"
          name="data_registo"
          value={form.data_registo}
          onChange={handleChange}
        />
        <input
          className="clientes-input"
          name="morada"
          value={form.morada}
          onChange={handleChange}
          placeholder="Morada"
        />
        <input
          className="clientes-input"
          name="contacto"
          value={form.contacto}
          onChange={handleChange}
          placeholder="Contacto"
        />
        <div className="btn-group">
          <button type="submit" className="btn-save">Guardar</button>
          <button type="button" className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ClienteForm;
