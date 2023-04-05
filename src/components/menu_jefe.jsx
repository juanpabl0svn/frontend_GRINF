import { useState } from "react"


const MenuJefe = () =>{

    const [page, setPage] = useState('admin')

    return (
      <div className="page">
        <header>
          <nav>
            <a href=""><input type="button" value="admin" onClick={(e)=>{setPage('admin')}}/></a>
            <a href=""><input type="button" value="jefe" onClick={(e)=>{setPage('jefe')}} /></a>
            <a href=""><input type="button" value="datos" onClick={(e)=>{setPage('colaborador')}} /></a>
            </nav>
        </header>
        <div className="content">
          {
            pages[page] || <h1>Error</h1>
          }
        </div>
      </div>
    )  
}

export default MenuJefe