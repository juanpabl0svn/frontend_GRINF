import { useState, useEffect, useCallback, useRef } from "react";
import { URL } from "../../App";
import showAlert from "../../alerts";
import debounce from "just-debounce-it";

export default function NewUser() {
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    role: 0,
    area: 0,
  });

  const putWhiteValues = () => {
    setData({
      name: "",
      surname: "",
      email: "",
      role: 0,
      area: 0,
    });
  };

  const sendUserData = async (e) => {
    e.preventDefault();
    if (data.role != 0 && data.area != 0) {
      const newUser = JSON.stringify(data);
      const req = await fetch(URL + `users/${newUser}`, { method: "POST" });
      if (req.ok) {
        showAlert({
          title: "Usuario creado",
          text: "Ahora el usuario puede acceder al software",
          icon: 0,
        });
        putWhiteValues();
      } else {
        showAlert({
          title: "Ups!!!",
          text: "Algo salio mal",
          icon: 1,
        });
      }
      return;
    }
    showAlert({
      title: "Diligencie todo el formulario",
      text: "Hay campos vacios o sin valor",
      icon: 2,
    });
  };

  const [areas, setAreas] = useState(null);

  useEffect(() => {
    if (areas === null) {
      fetch(URL + "areas")
        .then((res) => res.json())
        .then((area) => setAreas(area));
    }
    return;
  }, [areas]);

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
              console.log(data);
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
          <label htmlFor="role">Rol</label>
          <select
            name="role"
            id="role"
            className="form-user"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>Seleccione un rol</option>
            <option value={1}>ADMIN</option>
            <option value={2}>JEFE AREA</option>
            <option value={3}>COLABORADOR</option>
          </select>
        </div>
        <div className="info">
          <label htmlFor="role">Area</label>
          <select
            name="role"
            id="role"
            className="form-user"
            value={data.area}
            onChange={(e) => setData({ ...data, area: e.target.value })}
          >
            <option value={0}>Seleccione una área</option>
            {areas != null
              ? areas.map((area, index) => {
                  return (
                    <option key={index} value={area.id_area}>
                      {area.area_description.toUpperCase()}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <input type="submit" className="log-in-button button" value="Crear" />
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
  const [users, setUsers] = useState();

  const [userData, setUserData] = useState();

  const [filter, setFilter] = useState('');

  const lastCall = useRef('')

  useEffect(() => {
    if (!users || filter != '' && filter != lastCall.current){
      handleSearch();
      lastCall.current = filter
      console.log(lastCall.current)
      return 
    }
    if (filter == ''){
      handleSearch();
      return 
    }
  }, [users,filter]);

  function ChangeUser() {
    const [areas, setAreas] = useState(null);

    const [newData, setNewData] = useState({
      username: userData[0].username,
      id_user: userData[0].id_user,
      name: userData[0].name,
      surname: userData[0].surname,
      email: userData[0].email,
      id_role: userData[0].id_role,
      id_area: userData[0].id_area,
    });

    useEffect(() => {
      if (!areas) {
        fetch(URL + "areas")
          .then((res) => res.json())
          .then((area) => {
            setAreas(area);
          });
      }
      return;
    }, [areas]);

    return (
      <div className="box">
        <form onSubmit={() => setUserData()} className="change-user">
          <div className="user-edit">
            <label htmlFor="">Usuario</label>
            <input
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, username: value });
                }
              }}
              value={newData.username}
              required
            />
          </div>
          <div className="user-edit">
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, name: value });
                }
              }}
              value={newData.name}
              required
            />
          </div>
          <div className="user-edit">
            <label htmlFor="">Apellido</label>
            <input
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, surname: value });
                }
              }}
              value={newData.surname}
              required
            />
          </div>

          <div className="user-edit">
            <label htmlFor="">Correo</label>

            <input
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, email: value });
                }
              }}
              value={newData.email}
              required
            />
          </div>

          <div className="user-edit">
            <label htmlFor="">Rol</label>

            <select
              name="role"
              id="role"
              value={newData.id_role}
              onChange={(e) =>
                setNewData({ ...newData, id_role: e.target.value })
              }
            >
              <option value={1}>ADMIN</option>
              <option value={2}>JEFE AREA</option>
              <option value={3}>COLABORADOR</option>
            </select>
          </div>

          <div className="user-edit">
            <label htmlFor="">Area</label>

            <select
              name="role"
              id="role"
              value={newData.id_area}
              onChange={(e) =>
                setNewData({ ...newData, id_area: e.target.value })
              }
            >
              {areas != null
                ? areas.map((area, index) => {
                    return (
                      <option key={index} value={area.id_area}>
                        {area.area_description.toUpperCase()}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <input
            type="button"
            className="user-save-data button"
            value="Guardar"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const newDataString = JSON.stringify(newData);
                const req = await fetch(URL + `users/${newDataString}`, {
                  method: "PUT",
                });
                showAlert({
                  title: "Usuario modificado con exito",
                  text: "Los cambios ahora se ven reflejados en el usuario",
                  icon: 0,
                });
                setUserData();
                setUsers();
              } catch (err) {
                showAlert({
                  title: "Ups!!!",
                  text: `El usuario no se pudo modificar por que ${err}`,
                  icon: 1,
                });
              }
            }}
          />

          <input
            type="button"
            className="user-save-data button"
            value="Salir"
            onClick={() => setUserData()}
          />
        </form>
      </div>
    );
  }

  const handleSearch = useCallback(
    debounce(() => {
      fetch(URL + `users${filter != '' ? `/filter/${filter}` : ""}`)
        .then((data) => data.json())
        .then((info) => setUsers(info));

    }, 600),[filter]
  );

  return (
    <div className="all">
      <input
        type="text"
        className="static"
        placeholder="buscar"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)}}
      />
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
        {users ? (
          users.map(
            (
              {
                id_user,
                username,
                name,
                surname,
                email,
                role_description,
                area_description,
              },
              index
            ) => {
              return (
                <div className="user-data" key={index}>
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
                    <p>{role_description}</p>
                  </div>
                  <div className="item">
                    <p>{area_description}</p>
                  </div>
                </div>
              );
            }
          ) || <h1>Sin registros...</h1>
        ) : (
          <h1>Cargando...</h1>
        )}
        {userData && <ChangeUser />}
      </div>
    </div>
  );
}
