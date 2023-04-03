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
            birthdate: 'dd/mm/yyy',
            role:'0'
        })
    }

    const send_user_data = async(e) =>{
        e.preventDefault()
        if (data.role != 0){
            const new_user = JSON.stringify(data)
            const req = await fetch(URL+`users/create/${new_user}`)
            if (req.status != 200){
                alert('usuario creaado')
            }else{
                alert('Error la crear usuarios')
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
            <input type="submit" />
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

    useEffect(async()=>{
        if(users){return}
        const users = await fetch(URL+`users/all`)
        const res = await users.json()
        setUsers(res)
    },[])

    return(
        <div className="all scroll">
            <div className="table">
                <h4>ID</h4>
                <h4>Usuario</h4>
                <h4>Nombre</h4>
                <h4>Apellido</h4>
                <h4>Email</h4>
                <h4>Rol</h4>
            </div>
            {
                users!==null ? users.map(({id,username,name,surname,email,rol})=>{
                    <div className="user-data">
                        <p>{id}</p>
                        <p>{username}</p>
                        <p>{name}</p>
                        <p>{surname}</p>
                        <p>{email}</p>
                        <p>{rol}</p>
                    </div>

                }):<h1>Sin registros</h1>
            }
        </div>
    )
}
