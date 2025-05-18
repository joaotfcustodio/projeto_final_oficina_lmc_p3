import { Routes, Route } from "react-router-dom";

// Pages
import ClientesPage from "./pages/clientes/index";
import Dashboard from "./pages/dashboard/index";
import ReparacoesPage from "./pages/reparacoes";
import MateriaisUtilizadosPage from "./pages/material_utilizado/index";
import VeiculosPage from "./pages/veiculos/index";

// Components
import Layout from "./components/layout";
import LoginUi from "./components/login";

// Styles
import "./App.css";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginUi />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/veiculos" element={<VeiculosPage />} />
          <Route path="/reparacoes" element={<ReparacoesPage />} />
          <Route path="/materiais" element={<MateriaisUtilizadosPage />} /> 
        </Route>
      </Routes>
  );
};

export default App;
