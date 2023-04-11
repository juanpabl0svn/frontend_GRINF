import { useState, useEffect } from "react"
import User from "./elements/user_info"
import { URL_WEB } from '../App'
import { useLocation } from 'react-router-dom';

const MenuJefe = () =>{

  const user = JSON.parse(window.sessionStorage.getItem('user')) || null

  const location = useLocation()

  useEffect(() => {
    if (!user) {
        window.location.href = URL_WEB
    }
    if(`/${user.role_name}` != location.pathname){
      window.location.href = URL_WEB + user.role_name
    }
},[])

    const [page, setPage] = useState('admin')

    return (
      <div className='page'>
        <User/>
        <header>
          <nav>
            <a href=""><input type="button" value="Crear actividad" onClick={(e)=>{
              e.preventDefault();
              setPage(1)}}/></a>
            <a href=""><input type="button" value="Informe" onClick={(e)=>{
              e.preventDefault()
              setPage(2)}} /></a>
            <a href=""><input type="button" value="Usuarios" onClick={(e)=>{
              e.preventDefault()
              setPage(3)}} /></a>
            </nav>
        </header>
        <div className="all">
            {/* {pages[page] || <h1>Error</h1>} */}
        </div>
      </div>
    ) 
}

export default MenuJefe