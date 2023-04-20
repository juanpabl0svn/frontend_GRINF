import { useEffect, useState } from "react";
import { URL } from "../../App";

const CreateActivity = () => {
  const [activity, setActivity] = useState({
    title: "",
    mandated: "",
    description: "",
    relevance: 0,
    date_start: "",
    data_end: "",
    state: 0,
  });

  const [areas, setAreas] = useState(null);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (areas == null) {
      fetch(URL + "areas")
        .then((res) => res.json())
        .then((area) => setAreas(area));
    }
    return;
  }, [areas]);

  useEffect(() => {
    if (users == null) {
      fetch(URL + "users")
        .then((data) => data.json())
        .then((info) => setUsers(info));
    }
    return
  }, [users]);


  return (
    <form className="all">
      <div className="data-container">
        <div className="data-colab">
          <label htmlFor="">Titulo</label>
          <input type="text" className="text-box" value={activity.title} onChange={() => setActivity({...activity,title:e.target.value})} />
        </div>
        <div className="data-colab">
          <label htmlFor="">Encargado</label>
          <input list="users" />
          <datalist id="users">
            <option>hola</option>
            {users != null
              ? users.map((user, index) => {
                  <option key={index} value={user.id_user}>
                    {user.username}
                  </option>;
                })
              : null}
          </datalist>
        </div>
        <div className="data-colab">
          <label htmlFor="">Descripcion</label>
          <textarea name="" id="" className="text-box description"></textarea>
        </div>
        <div className="data-colab">
          <label htmlFor="">Relevancia</label>
          <select
            name="role"
            id="role"
            className="text-box"
            value={activity.relevance}
            onChange={(e) => setData({ ...activity, relevance: e.target.value })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div className="data-colab">
          <label htmlFor="">Area</label>
          <select
            name="role"
            id="role"
            className="text-box"
            onChange={(e) => setData({ ...activity, role: e.target.value })}
          >
            <option value={0}>Seleccione una área</option>
            {areas != null
              ? areas.map((area, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {area.area_description.toUpperCase()}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="data-colab">
          <label htmlFor="">Inicio</label>
          <input type="date" className="text-box" />
        </div>
        <div className="data-colab">
          <label htmlFor="">Final</label>
          <input type="date" className="text-box" />
        </div>
        <div className="data-colab">
          <label htmlFor="">Estado</label>
          <select
            name="role"
            id="role"
            className="text-box"
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>Seleccione un estado</option>
            <option value={1}>ACTIVO</option>
            <option value={2}>INACTIVO</option>
            <option value={3}>PENDIENTE</option>
          </select>
        </div>
      </div>
      <div className="send">
        <input type="submit" value="Enviar" />
      </div>
    </form>
  );
};

export const GetActivities = () => {
  const [activities, setActivities] = useState();

  // useEffect(() => {
  //   if (!activities) {
  //     fetch(URL + "activities")
  //       .then((res) => res.json())
  //       .then((act) => setActivities(act));
  //   }
  //   return;
  // }, [activities]);

  return (
    <div className="all">
      <h1>Hola</h1>
    </div>
  );
};
export default CreateActivity;
