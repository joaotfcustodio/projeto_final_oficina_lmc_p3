import { Box, Button, TextField, Alert } from "@mui/material";
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

      localStorage.setItem("token", AccessToken);

      navigate("/clientes");
    } catch (err) {
      setErro("Email ou password incorretos, ou conta não registada.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        px: 2,
        py: 4,
        boxSizing: "border-box",
      }}
    >
      <Box
        component="img"
        src={oficinaLogo}
        alt="Logo Oficina"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", sm: "22em" },  
          maxHeight: { xs: "none", sm: "22em" }, 
          objectFit: "contain",
          mb: 3, 
          display: "block",
        }}
      />

      {!mostrarRegisto ? (
        <Box
          component="form"
          noValidate
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: "22em", 
            boxSizing: "border-box",
          }}
        >
          <TextField
            fullWidth
            required
            label="Email:"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2, fontSize: "1em" }}
          />
          <TextField
            fullWidth
            required
            label="Password:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, fontSize: "1em" }}
          />

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ height: "3.125em", borderRadius: 0.125 }}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 2 }}
            onClick={() => setMostrarRegisto(true)}
          >
            Ainda não tens conta? Regista-te aqui
          </Button>
        </Box>
      ) : (
        <RegistoUi onClose={() => setMostrarRegisto(false)} />
      )}
    </Box>
  );
};

export default LoginUi;
