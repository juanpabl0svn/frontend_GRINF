import { useState, useEffect } from "react";
import { URL } from "../../App";

export default function NewUser() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    birthdate: "",
    role: "0",
  });

  const putWhiteValues = () => {
    setData({
      name: "",
      surname: "",
      email: "",
      birthdate: "",
      role: "0",
    });
  };

  const sendUserData = async (e) => {
    e.preventDefault();
    if (data.role != 0) {
      const newUser = JSON.stringify(data);
      const req = await fetch(URL + `users/${newUser}`, { method: "POST" });
      console.log(req);
      if (req.status === 200) {
        alert("usuario creado");
        putWhiteValues();
      } else {
        alert("Error la crear usuario");
      }
      return;
    }
    alert("Escoger rol para el usuario");
  };

  return (
    <div>
      <form className="all" onSubmit={sendUserData}>
        <div className="info">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            className="form-user"
            required
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
              console.log(data)
            }}
          />
        </div>
        <div className="info">
          <label htmlFor="surname">Apellido</label>
          <input
            type="text"
            id="surname"
            className="form-user"
            required
            value={data.surname}
            onChange={(e) => {
              setData({ ...data, surname: e.target.value });
            }}
          />
        </div>
        <div className="info">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="form-user"
            required
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
        </div>
        <div className="info">
          <label htmlFor="date">Fecha nacimiento</label>
          <input
            type="date"
            id="date"
            className="form-user"
            requiredvalue={data.date}
            onChange={(e) => {
              setData({ ...data, birthdate: e.target.value });
            }}
          />
        </div>
        <div className="info">
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            id="role"
            className="form-user"
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>Seleccione un rol</option>
            <option value={1}>Admin</option>
            <option value={2}>Jefe Area</option>
            <option value={3}>Colaborador</option>
          </select>
        </div>
        <div className="info">
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            id="role"
            className="form-user"
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>Seleccione una área</option>
            <option value={1}>Admin</option>
            <option value={2}>Jefe Area</option>
            <option value={3}>Colaborador</option>
          </select>
        </div>
        <input type="submit" className="submit" value="Crear" />
      </form>
    </div>
  );
}

export function CreateInf() {
  return (
    <div className="all">
      <input type="button" value="Generar informe" />
    </div>
  );
}

export function SearchUsers() {
  const [users, setUsers] = useState(null);

  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch(`${URL}users`)
      .then((data) => data.json())
      .then((info) => setUsers(info));
  }, []);

  function ShowData() {
    console.log(userData[1]);
    return (
      <div className="box">
        <form onSubmit={() => setUserData()} className="change-user">
          <input type="text" onChange={() => {}} value={userData[0].name} />
          <input type="text" onChange={() => {}} value={userData[0].surname} />
          <input type="text" onChange={() => {}} value={userData[0].email} />
          <input
            type="text"
            onChange={() => {}}
            value={userData[0].role_name}
          />

          <input type="submit" value="Salir" />
        </form>
      </div>
    );
  }

  return (
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
        <div className="title-item">
          <h4>Area</h4>
        </div>
      </div>
      <div className="scroll">
        {users !== null ? (
          users.map(
            ({ id_user, username, name, surname, email, role_name }, index) => {
              return (
                <div className="user-data">
                  <div className="item">
                    <input
                      type="button"
                      className="select-user"
                      onClick={() => setUserData([users[index], index])}
                    />
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
                  <div className="item">
                    <p>AREA</p>
                  </div>
                </div>
              );
            }
          ) || <h1>Sin registros...</h1>
        ) : (
          <h1>Cargando...</h1>
        )}
        {userData && <ShowData />}
      </div>
    </div>
  );
}
