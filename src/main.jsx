import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuAdmin from "./components/menu_admin";
import MenuJefe from "./components/menu_jefe";
import MenuColaborador from "./components/menu_colaborador";
import ChangePassword from "./components/change_password";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<MenuAdmin />} />
      <Route path="/jefe" element={<MenuJefe />} />
      <Route path="/colaborador" element={<MenuColaborador />} />
      <Route path="/clave" element={<ChangePassword />} />
      <Route path="*" element={<h1>Error</h1>} />
    </Routes>
  </BrowserRouter>
);
