import React,{useState} from 'react'
import { useLocation } from 'react-router-dom'

const Menu = () => {

  const page = useLocation()

  const [visible_info, setVisibility] = useState(true)

  return (
    <div>
      <header>
        <nav>
          <a href=""><input type="button" value="inicio" /></a>
          <a href=""><input type="button" value="consultas" /></a>
          <a href=""><input type="button" value="datos" /></a>
          </nav>
      </header>
      <div className="content">

      </div>
    </div>
  )
}

export default Menu
