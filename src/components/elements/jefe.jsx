import { useEffect, useState } from "react";
import { URL } from "../../App";

const CreateActivity = () => {

  const [activity, setActivity] = useState({
    title: "",
    mandated: "",
    description: "",
    relevance: 0,
    date_start: "",
    date_end: "",
  });

  const setWhiteValues = () => {
    setActivity({
      title: "",
      mandated: "",
      description: "",
      relevance: 0,
      date_start: "",
      date_end: "",
    });
  }

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
      fetch(URL + "colab")
        .then((data) => data.json())
        .then((info) => {
          console.log(info);
          setUsers(info);
        });
    }
    return;
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.encargado === 0) {
      alert("Ingrese encargado");
    }
    if (activity.relevance === 0) {
      alert("Ingrese relevancia");
    }
    activity.title = activity.title
      .toLowerCase()
      .split(" ")
      .map((el) => {
        const upper = el[0].toUpperCase();
        return upper + el.slice(1, el.length);
      })
      .join(" ");
    
    console.log(activity);
    const data = JSON.stringify(activity);
    const res = fetch(URL + `activity/${data}`, { method: "POST" })
    .then(res => res.json())
    .then(info => {return info})
    console.log(res)

    if (info.status === 200){
      alert('actividad creada')
      setWhiteValues()
    }else{
      alert('Error!! ')
    }
  };

  return (
    <form className="all" onSubmit={handleSubmit}>
      <div className="data-container">
        <div className="data-colab">
          <label htmlFor="">Titulo</label>
          <input
            type="text"
            className="text-box"
            value={activity.title}
            onChange={(e) => {
              const value = e.target.value;
              if (!value.startsWith(" ")) {
                setActivity({ ...activity, title: value });
              }
            }}
            required
          />
        </div>
        <div className="data-colab">
          <label htmlFor="">Encargado</label>
          <select
            name="role"
            id="role"
            className="text-box"
            value={activity.mandated}
            onChange={(e) =>
              setActivity({ ...activity, mandated: parseInt(e.target.value) })
            }
          >
            <option value={0}>Escoger encargado</option>
            {users != null
              ? users.map((user) => {
                  return (
                    <option key={user.id_user} value={user.id_user}>
                      {user.full_name}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
        <div className="data-colab">
          <label htmlFor="">Descripcion</label>
          <textarea
            name=""
            id=""
            className="text-box description"
            value={activity.description}
            onChange={(e) => {
              const value = e.target.value;
              if (!value.startsWith(" ")) {
                setActivity({ ...activity, description: value });
              }
            }}
            required
          ></textarea>
        </div>
        <div className="data-colab">
          <label htmlFor="">Relevancia</label>
          <select
            name="relevance"
            id="relevance"
            className="text-box"
            value={activity.relevance}
            onChange={(e) =>
              setActivity({ ...activity, relevance: parseInt(e.target.value) })
            }
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        <div className="data-colab">
          <label htmlFor="">Inicio</label>
          <input type="date" className="text-box" value={activity.date_start} onChange={(e)=> setActivity({...activity,date_start: e.target.value})} />
        </div>
        <div className="data-colab">
          <label htmlFor="">Fin</label>
          <input type="date" className="text-box" value={activity.date_end} onChange={(e)=> setActivity({...activity,date_end: e.target.value})} />
        </div>
      </div>
      <div className="send">
        <input type="submit" value="Enviar" />
      </div>
    </form>
  );
};

export const GetActivities = () => {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    if (!activities) {
      fetch(URL + "activity")
        .then((res) => res.json())
        .then((act) => setActivities(act));
    }
    return;
  }, [activities]);

  return (
    <div className="all">
      <div className="table">
        <div className="title-item">
          <h4>ID</h4>
        </div>
        <div className="title-item">
          <h4>Titulo</h4>
        </div>
        <div className="title-item">
          <h4>Encargado</h4>
        </div>
        <div className="title-item">
          <h4>Relevancia</h4>
        </div>
        <div className="title-item">
          <h4>Inicio</h4>
        </div>
        <div className="title-item">
          <h4>Fin</h4>
        </div>
        <div className="title-item">
          <h4>Estado</h4>
        </div>
      </div>
      <div className="scroll">
        {activities !== null ? (
          activities.map(
            (
              {
                id_activity,
                activity_title,
                full_name,
                relevance,
                date_start,
                date_end,
                state_description
              },
              index
            ) => {
              return (
                <div className="user-data">
                  <div className="item">
                    <input
                      type="button"
                      className="select-user"
                    />
                  </div>
                  <div className="item">
                    <p>{id_activity}</p>
                  </div>
                  <div className="item">
                    <p>{activity_title}</p>
                  </div>
                  <div className="item">
                    <p>{full_name}</p>
                  </div>
                  <div className="item">
                    <p>{relevance}</p>
                  </div>
                  <div className="item">
                    <p>{date_start}</p>
                  </div>
                  <div className="item">
                    <p>{date_end}</p>
                  </div>
                  <div className="item">
                    <p>{state_description}</p>
                  </div>
                </div>
              );
            }
          ) || <h1>Sin registros...</h1>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
    </div>
  );
};
export default CreateActivity;
