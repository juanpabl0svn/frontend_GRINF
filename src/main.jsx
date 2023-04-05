import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Admin from './components/elements/admin'
import Jefe from './components/elements/jefe'
import Colaborador from './components/elements/colaborador'
import MenuAdmin from './components/menu_admin'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/admin' element={<MenuAdmin/>}/>
      <Route path='/jefe' element={<Jefe/>}/>
      <Route path='/colaborador' element={<Colaborador/>}/>
    </Routes>
  </BrowserRouter>,
)
