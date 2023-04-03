import React,{useState} from 'react'
import NewUser from './elements/admin'

document.title = 'Admin'

const pages = {
  1:<NewUser/>
 }

const MenuAdmin = () => {

  const [page, setPage] = useState(1)

  return (
    <div className='page'>
      <header>
        <nav>
          <a href=""><input type="button" value="admin" onClick={(e)=>{
            e.preventDefault();
            setPage(1)}}/></a>
          <a href=""><input type="button" value="jefe" onClick={(e)=>{
            e.preventDefault()
            setPage(2)}} /></a>
          <a href=""><input type="button" value="datos" onClick={(e)=>{
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
