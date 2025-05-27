import { Box, Button, Container, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import oficinaLogo from "../../assets/oficinaLogo.png";
import RegistoUi from "@/components/registo/RegistoUi";

const LoginUi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarRegisto, setMostrarRegisto] = useState(false);
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro(null);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });

      const { AccessToken } = response.data;

      // Guarda o token para uso posterior (ex: headers nas requests)
      localStorage.setItem("token", AccessToken);

      // Redireciona para a página protegida
      navigate("/clientes");
    } catch (err) {
      setErro("Email ou password incorretos, ou conta não registada.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img
          src={oficinaLogo}
          alt="Logo Oficina"
          style={{ width: 250, marginBottom: 20 }}
        />
        {!mostrarRegisto ? (
          <>
            <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: "100%" }}>
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

              {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ height: 50, borderRadius: 2 }}
              >
                Entrar
              </Button>
            </Box>

            <Button
              fullWidth
              variant="text"
              sx={{ mt: 2 }}
              onClick={() => setMostrarRegisto(true)}
            >
              Ainda não tens conta? Regista-te aqui
            </Button>
          </>
        ) : (
          <RegistoUi onClose={() => setMostrarRegisto(false)} />
        )}
      </Box>
    </Container>
  );
};

export default LoginUi;
