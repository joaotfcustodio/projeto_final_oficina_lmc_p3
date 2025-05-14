import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginUi from "./components/login";
import ClientesPage from "./pages/clientes/index";
import ReparacoesPage from "./pages/reparacoes";
import VeiculosPage from "./pages/veiculos/index";
import MateriaisUtilizadosPage from "./pages/material_utilizado/index";
import "./App.css";

const AppContent = () => {



  return (
   
        <Routes>
          <Route path="/" element={<LoginUi />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/veiculos" element={<VeiculosPage />} />
          <Route path="/reparacoes" element={<ReparacoesPage />} />
          <Route path="/materiais" element={<MateriaisUtilizadosPage />} />  
          {/* outras rotas... */}
        </Routes>
    
  );
};


const App = AppContent;

export default App;