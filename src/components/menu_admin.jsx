import React,{useState, useEffect} from 'react'
import NewUser,{CreateInf,SearchUsers} from './elements/admin'
import User from './elements/user_info'
import { URL_WEB } from '../App'
import { useLocation } from 'react-router-dom';

document.title = 'Admin'

const pages = {
  1:<NewUser/>,
  2:<CreateInf/>,
  3:<SearchUsers/>,
 }

const MenuAdmin = () => {

  const user = JSON.parse(window.sessionStorage.getItem('user')) || null

  const location = useLocation()

  useEffect(() => {
    if (!user) {
        window.location.href = URL_WEB
    }
    if(`/${user.role_name}` != location.pathname){
      window.location.href = URL_WEB + user.role_name
    }
}
,[])

  const [page, setPage] = useState(1)


  return (
    <div className='page'>
      <User/>
      <header>
        <nav>
          <a href=""><input type="button" value="Nuevo usuario" onClick={(e)=>{
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
          {pages[page] || <h1>Error</h1>}
      </div>
    </div>
  )
}

export default MenuAdmin
