import axios from "axios";

class AuthService {
  async login(email, password) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res.data.AccessToken;

      // Guarda o token no localStorage
      localStorage.setItem("token", token);

      // Define o token para todos os próximos pedidos axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return res.data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }

  async register(nome, email, password) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/register",
        {
          nome,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Erro no registo:", error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default new AuthService();
