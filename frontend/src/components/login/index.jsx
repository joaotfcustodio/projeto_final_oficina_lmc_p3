import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import oficinaLogo from "../../assets/oficinaLogo.png";

const LoginUi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Autenticação omitida por agora
    navigate("/clientes");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={oficinaLogo} alt="Logo Oficina" style={{ width: 250, marginBottom: 20 }} />
        <Box component="form" noValidate onSubmit={handleLogin}>
          <TextField
            fullWidth
            required
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: 50, borderRadius: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginUi;
