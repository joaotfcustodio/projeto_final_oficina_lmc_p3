import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import "./styles.css";

const ClienteForm = ({ clienteSelecionado, onCreated, resetClienteSelecionado }) => {
  const [form, setForm] = useState({
    nome: "",
    morada: "",
    nif: "",
    contacto: "",
    data_registo: "",
  });

  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState(null);

  useEffect(() => {
    if (clienteSelecionado) {
      setForm({
        nome: clienteSelecionado.nome || "",
        morada: clienteSelecionado.morada || "",
        nif: clienteSelecionado.nif || "",
        contacto: clienteSelecionado.contacto || "",
        data_registo: clienteSelecionado.data_registo?.split("T")[0] || "",
      });
    }
  }, [clienteSelecionado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(null);
    setTipoMensagem(null);

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (clienteSelecionado) {
        await axios.put(`http://localhost:5000/api/v1/clientes/${form.nif}`, form, { headers });
        setMensagem("Cliente atualizado com sucesso!");
        setTipoMensagem("success");
      } else {
        await axios.post("http://localhost:5000/api/v1/clientes", form, { headers });
        setMensagem("Cliente criado com sucesso!");
        setTipoMensagem("success");
      }

      setForm({ nome: "", morada: "", nif: "", contacto: "", data_registo: "" });
      onCreated?.();
      resetClienteSelecionado?.();
    } catch (error) {
      let mensagemErro = "Erro ao guardar cliente.";
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) mensagemErro = "Preenche todos os campos obrigatórios.";
        else if (status === 409) mensagemErro = "Já existe um cliente com esse NIF.";
        else if (status === 500) mensagemErro = "Erro interno no servidor.";
        else if (data?.message) mensagemErro = data.message;
      }
      setMensagem(mensagemErro);
      setTipoMensagem("error");
    }
  };

  const limparFormulario = () => {
    setForm({ nome: "", morada: "", nif: "", contacto: "", data_registo: "" });
    setMensagem(null);
    setTipoMensagem(null);
    resetClienteSelecionado?.();
  };

  return (
    <form className="clientes-form" onSubmit={handleSubmit}>
      <label>
        <b>NIF*</b>
        <Input
          name="nif"
          value={form.nif}
          onChange={handleChange}
          placeholder="NIF"
          disabled={!!clienteSelecionado}
        />
      </label>

      <label>
        Nome
        <Input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
      </label>

      <label>
        Data de Registo
        <Input
          type="date"
          name="data_registo"
          value={form.data_registo}
          onChange={handleChange}
        />
      </label>

      <label>
        Morada
        <Input
          name="morada"
          value={form.morada}
          onChange={handleChange}
          placeholder="Morada"
        />
      </label>

      <label>
        Contacto
        <Input
          name="contacto"
          value={form.contacto}
          onChange={handleChange}
          placeholder="Contacto"
        />
      </label>

      {mensagem && (
        <div className={`mensagem ${tipoMensagem}`}>
          {mensagem}
        </div>
      )}

      <div className="btn-group">
        <Button
          type="submit"
          style={{
            backgroundColor: clienteSelecionado ? "#007bff" : "#28a745",
          }}
        >
          {clienteSelecionado ? "Atualizar" : "Adicionar"}
        </Button>
        <Button type="button" theme="secondary" onClick={limparFormulario}>
          Limpar
        </Button>
      </div>
    </form>
  );
};

export default ClienteForm;
