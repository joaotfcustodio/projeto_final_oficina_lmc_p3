import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "./styles.css";

const VeiculoForm = ({ onCreated, veiculoEditavel, onCancelEdit }) => {
  const [form, setForm] = useState({
    nif: "",
    marca: "",
    modelo: "",
    matricula: "",
    cor: "",
    ano: "",
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState(null);

  useEffect(() => {
    if (veiculoEditavel) {
      setForm({
        nif: veiculoEditavel.clientes?.[0]?.nif || "",
        marca: veiculoEditavel.marca || "",
        modelo: veiculoEditavel.modelo || "",
        matricula: veiculoEditavel.matricula || "",
        cor: veiculoEditavel.cor || "",
        ano: veiculoEditavel.ano || "",
      });
      setModoEdicao(true);
    } else {
      limparFormulario();
    }
  }, [veiculoEditavel]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const limparFormulario = () => {
    setForm({
      nif: "",
      marca: "",
      modelo: "",
      matricula: "",
      cor: "",
      ano: "",
    });
    setMensagem(null);
    setTipoMensagem(null);
    setModoEdicao(false);
    onCancelEdit?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);
    setTipoMensagem(null);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      if (modoEdicao) {
        const res = await axios.put(
          `http://localhost:5000/api/v1/veiculos/${form.matricula}`,
          form,
          { headers }
        );
        if (res.data.status === "success") {
          setMensagem("Veículo atualizado com sucesso!");
          setTipoMensagem("success");
          onCreated?.(); // ✅ dispara reload da tabela
          limparFormulario();
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/v1/veiculos",
          form,
          { headers }
        );
        if (res.data.status === "success") {
          setMensagem("Veículo adicionado com sucesso!");
          setTipoMensagem("success");
          onCreated?.(); // ✅ dispara reload da tabela
          limparFormulario();
        }
      }
    } catch (error) {
      let erroMsg = "Erro ao processar veículo.";
      if (error.response?.data?.message) {
        erroMsg = error.response.data.message;
      }
      setMensagem(erroMsg);
      setTipoMensagem("error");
    }
  };

  return (
    <form className="veiculos-form" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <Input
        name="nif"
        value={form.nif}
        onChange={handleChange}
        placeholder="NIF do Cliente"
        required
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
        disabled={modoEdicao}
      />
      <Input
        name="cor"
        value={form.cor}
        onChange={handleChange}
        placeholder="Cor"
      />
      <Input
        type="number"
        name="ano"
        value={form.ano}
        onChange={handleChange}
        placeholder="Ano"
      />

      {mensagem && (
        <div
          style={{
            backgroundColor: tipoMensagem === "success" ? "#d4edda" : "#f8d7da",
            color: tipoMensagem === "success" ? "#155724" : "#721c24",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginTop: "1rem",
          }}
        >
          {mensagem}
        </div>
      )}

      <div className="btn-group" style={{ marginTop: "1rem" }}>
        <Button
          className="btn-adicionar"
          type="submit"
          theme={modoEdicao ? "primary" : "default"}
        >
          {modoEdicao ? "Atualizar" : "Adicionar"}
        </Button>
        <Button type="button" theme="secondary" onClick={limparFormulario}>
          {modoEdicao ? "Cancelar" : "Limpar"}
        </Button>
      </div>
    </form>
  );
};

export default VeiculoForm;
