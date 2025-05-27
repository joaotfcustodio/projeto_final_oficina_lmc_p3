import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const RegistoUi = ({ onClose }) => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/register", form);
      alert("Utilizador registado com sucesso!");
      onClose(); // Fecha o card
    } catch (err) {
      alert("Erro ao registar: " + (err.response?.data?.message || "Erro desconhecido"));
    }
  };

  return (
    <Paper elevation={4} sx={{ padding: 3, maxWidth: 400, marginTop: 3 }}>
      <Typography variant="h6" gutterBottom>
        Criar Conta
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Nome"
          name="nome"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={form.nome}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          required
          sx={{ mb: 2 }}
          value={form.password}
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" type="submit">
            Registar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RegistoUi;
