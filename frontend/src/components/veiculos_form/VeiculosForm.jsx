import { useState } from "react";
import axios from "axios";
import "./VeiculosForm.css";

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
    } catch (err) {
      alert("Erro ao adicionar veículo.");
    }
  };

  return (
    <div className="veiculo-card">
      <h5>Adicionar Veículo</h5>
      <form onSubmit={handleSubmit}>
        <input
          name="nif"
          value={form.nif}
          onChange={handleChange}
          placeholder="NIF do Cliente"
        />
        <input
          name="marca"
          value={form.marca}
          onChange={handleChange}
          placeholder="Marca"
        />
        <input
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
          placeholder="Modelo"
        />
        <input
          name="matricula"
          value={form.matricula}
          onChange={handleChange}
          placeholder="Matrícula"
        />
        <input
          type="number"
          name="ano"
          value={form.ano}
          onChange={handleChange}
          placeholder="Ano"
        />
        <div className="btn-group">
          <button type="submit" className="btn-save">
            Guardar
          </button>
          <button type="button" className="btn-cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VeiculoForm;
