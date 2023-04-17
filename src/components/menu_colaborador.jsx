import User from "./elements/user_info";
import { useEffect, useState } from "react";
import { URL_WEB } from '../App'
import { useLocation } from 'react-router-dom';
import AddData from "./elements/colaborador";

const pages  = {
  1:<AddData/>
}

const MenuColaborador = () =>{

  const user = JSON.parse(window.sessionStorage.getItem('user')) || null

  const location = useLocation()

  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!user) {
        window.location.href = URL_WEB
    }
    if(`/${user.role_name}` != location.pathname){
      window.location.href = URL_WEB + user.role_name
    }
}
,[])
    return (
        <div className='page'>
          <User/>
          <header>
            <nav>
              <a href=""><input type="button" value="Agregar datos" onClick={(e)=>{
                e.preventDefault();
                setPage(1)}}/></a>
              <a href=""><input type="button" value="Actividades" onClick={(e)=>{
                e.preventDefault()
                setPage(2)}} /></a>
              <a href=""><input type="button" value="Usuarios" onClick={(e)=>{
                e.preventDefault()
                setPage(3)}} /></a>
              </nav>
          </header>
          <div className="all">
              {pages[page] || <h1>Error</h1>}
          </div>
        </div>
    )
}

export default MenuColaborador