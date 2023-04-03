import {useState, useEffect} from "react"
import './index.css'

export const URL = 'http://localhost:3000/'

const rol_page = {
  1:'admin',
  2:'jefe',
  3:'colaborador'
}

function App() {

  const [user,setUser] = useState({username:'',password:''})

  const logIn =JSON.parse(window.sessionStorage.getItem('user')) || null

  const setLogIn = (data) => {window.sessionStorage.setItem('user',data)}

  const submit = async(e) => {
    e.preventDefault()
    try{
      const res = await fetch(URL+`users/${JSON.stringify(user)}`)
      const data = await res.json()
      if (data){
        setLogIn(JSON.stringify(data))
        window.location.href = `http://localhost:5173/${rol_page[data.rol]}`
      }
    }
    catch(err) {
      alert('Usuario o contraseña incorrectos')
    }  
  }

  useEffect(() =>{
    if(!logIn) {return}
    window.location.href = `http://localhost:5173/${rol_page[logIn.rol]}`
  },[])

  return (
    <div className="card">
      <form className="form" onSubmit={submit}>
        <div className="data">
          <label htmlFor="username" id="username-label">Usuario</label>
          <div className="separator">
            <input type="text" name="username" id="username" value={user.username} onChange={(e) => {setUser({...user, username: e.target.value })}} />
          </div>      
        </div>
        <div className="data">
          <label htmlFor="password" id="password-label">Contraseña</label>
          <div className="separator">
            <input type="text" name="password" id="password" value={user.password} onChange={(e) => {setUser({...user, password: e.target.value })}} />
          </div>      
        </div>
        <div className="actions">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <input type="submit" value={'Ingresar'}/>
        </div>
      </form>
    </div>
  )
}

export default App  
