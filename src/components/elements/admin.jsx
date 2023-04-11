import React,{useState,useEffect} from 'react'
import { URL } from '../../App'

export default function NewUser(){
    
    const [data, setData] = useState({
        name:'',
        surname:'',
        email: '',
        birthdate: '',
        role:'0'
    })

    const put_white_values = () =>{
        setData({
            name:'',
            surname:'',
            email: '',
            birthdate: '',
            role:'0'
        })
    }

    const send_user_data = async(e) =>{
        e.preventDefault()
        if (data.role != 0){
            const new_user = JSON.stringify(data)
            const req = await fetch(URL+`users/${new_user}`,{method: 'POST'})
            console.log(req)
            if (req.status === 200){
                alert('usuario creado')
            }else{
                alert('Error la crear usuario')
            }
            return
        }
        alert('Escoger rol para el usuario')
        put_white_values()
    }


    return (
    <div >
        <form className="all" onSubmit={send_user_data}>
            <div className="info">
                <label htmlFor="name">Nombre</label>
                <input type="text" id='name' className='form-user' required value={data.name} onChange={(e) =>{setData({...data,name:e.target.value})}}/>
            </div>
            <div className="info">
                <label htmlFor="surname">Apellido</label>
                <input type="text" id='surname' className='form-user' required value={data.surname} onChange={(e) =>{setData({...data,surname:e.target.value})}}/>
            </div>
            <div className="info">
                <label htmlFor="email">Email</label>
                <input type="text" id='email' className='form-user' required value={data.email} onChange={(e) =>{setData({...data,email:e.target.value})}}/>
            </div>
            <div className="info">
                <label htmlFor="date">Fecha nacimiento</label>
                <input type='date' id='date' className='form-user' requiredvalue={data.date} onChange={(e) =>{setData({...data,birthdate:e.target.value})}}/>
            </div>
            <div className="info">
                <label htmlFor="role">Rol</label>
                <select name="role" id="role" className='form-user' onChange={(e) => setData({...data,role:e.target.value})}>
                    <option value={0}>Seleccione un rol</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Jefe Area</option>
                    <option value={3}>Colaborador</option>
                </select>
            </div>
            <input type="submit" className='submit' value='Crear'/>
        </form>
    </div>
    )
}

export function CreateInf(){
    return (
        <div className="all">
            <input type="button" value="Generar informe" />
        </div>
    )
}

export function SearchUsers(){

    const [users,setUsers] = useState(null)

    const [pressed,setPress] = useState()

    useEffect(() =>{
        const res = fetch(`${URL}users`)
            .then(data => data.json())
            .then(info => setUsers(info))
    },[])

    return(
        <div className="all">
            <div className="table">
                <div className="title-item">
                    <h4>ID</h4>
                </div>
                <div className="title-item">
                    <h4>Usuario</h4>
                </div>
                <div className="title-item">
                    <h4>Nombre</h4>
                </div>
                <div className="title-item">
                    <h4>Apellido</h4>
                </div>
                <div className="title-item">
                    <h4>Email</h4>
                </div>
                <div className="title-item">
                    <h4>Rol</h4>
                </div>
            </div>
            <div className="scroll">
                {
                    users!==null ? users.map(({id_user,username,name,surname,email,role_name})=>{
                    return(
                        <div className="user-data">
                            <div className="item">
                                <input type="button" className='select-user'/>
                            </div>
                            <div className="item">
                                <p>{id_user}</p>
                            </div>
                            <div className="item">
                                <p>{username}</p>
                            </div>
                            <div className="item">
                                <p>{name}</p>
                            </div>
                            <div className="item">
                                <p>{surname}</p>
                            </div>
                            <div className="item">
                                <p>{email}</p>
                            </div>
                            <div className="item">
                                <p>{role_name}</p>
                            </div>
                        </div>
                        )
                    }):<h1>Cargando...</h1>
                }
            </div>
        </div>
    )
}

