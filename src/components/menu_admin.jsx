import React,{useState} from 'react'
import NewUser,{CreateInf,SearchUsers} from './elements/admin'

document.title = 'Admin'

const pages = {
  1:<NewUser/>,
  2:<CreateInf/>,
  3:<SearchUsers/>,
 }

const MenuAdmin = () => {

  const [page, setPage] = useState(1)

  return (
    <div className='page'>
      <div className="user-main">
        <p>Info user</p>
      </div>
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
