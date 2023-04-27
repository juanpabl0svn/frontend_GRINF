import User from "./elements/user_info";
import { useEffect, useState } from "react";
import { URL_WEB } from "../App";
import { useLocation } from "react-router-dom";
import AddData from "./elements/colaborador";

const MenuColaborador = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user")) || null;
  const location = useLocation();

  if (!user) {
    window.location.href = URL_WEB;
    return;
  }
  if (`/${user.role_description}` != location.pathname) {
    window.location.href = URL_WEB + user.role_description;
    return;
  }

  const [page, setPage] = useState(1);

  document.title = "Colaborador";

  const pages = {
    1: <AddData />,
  };

  return (
    <div className="page">
      <User />
      <header>
        <nav>
          <a href="">
            <input
              type="button"
              value="Agregar datos"
              className={page==1 ? 'pressed': 'menu-button'}
              onClick={(e) => {
                e.preventDefault();
                setPage(1);
              }}
            />
          </a>
        </nav>
      </header>
      <div className="all">{pages[page] || <h1>Error</h1>}</div>
    </div>
  );
};


export default MenuColaborador;
