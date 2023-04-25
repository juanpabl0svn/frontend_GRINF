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
  };

  const [areas, setAreas] = useState();

  const [users, setUsers] = useState();

  useEffect(() => {
    if (!areas) {
      fetch(URL + "areas")
        .then((res) => res.json())
        .then((area) => setAreas(area));
    }
    return;
  }, [areas]);

  const area = JSON.parse(window.sessionStorage.getItem("user"));

  useEffect(() => {
    if (!users) {
      fetch(URL + `colab/${area.id_area}`)
        .then((data) => data.json())
        .then((info) => {
          console.log(info);
          setUsers(info);
        });
    }
    return;
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activity.mandated === 0) {
      alert("Ingrese encargado");
      return;
    }
    if (activity.relevance === 0) {
      alert("Ingrese relevancia");
      return;
    }
    activity.title = activity.title
      .toLowerCase()
      .split(" ")
      .map((el) => {
        const upper = el[0].toUpperCase();
        return upper + el.slice(1, el.length);
      })
      .join(" ");
    const data = JSON.stringify(activity);
    const req = await fetch(URL + `activity/${data}`, { method: "POST" });

    if (req.ok) {
      alert("actividad creada");
      setWhiteValues();
    } else {
      alert("Error!! ");
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
            onChange={(e) => {
              setActivity({ ...activity, mandated: parseInt(e.target.value) });
            }}
          >
            <option value={0}>Escoger encargado</option>
            {users
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
          <input
            type="date"
            className="text-box"
            value={activity.date_start}
            onChange={(e) =>
              setActivity({ ...activity, date_start: e.target.value })
            }
            required
          />
        </div>
        <div className="data-colab">
          <label htmlFor="">Fin</label>
          <input
            type="date"
            className="text-box"
            value={activity.date_end}
            onChange={(e) =>
              setActivity({ ...activity, date_end: e.target.value })
            }
            required
          />
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

  const [activityData, setActivityData] = useState();

  useEffect(() => {
    if (!activities) {
      fetch(URL + "activity")
        .then((res) => res.json())
        .then((act) => setActivities(act));
    }
    return;
  }, [activities]);

  function ChangeActivity() {
    const [newData, setNewData] = useState({
      id_activity: activityData[0].id_activity,
      activity_title: activityData[0].activity_title,
      activity_mandated: activityData[0].activity_mandated,
      full_name: activityData[0].full_name,
      relevance: activityData[0].relevance,
      activity_description: activityData[0].activity_description,
      date_end: activityData[0].date_end.split("/").join("-"),
      id_state: activityData[0].id_state,
      state_description: activityData[0].state_description,
    });

    const area = JSON.parse(window.sessionStorage.getItem("user"));

    const [colab, setColab] = useState();
    useEffect(() => {
      if (!colab) {
        fetch(URL + `colab/${area.id_area}`)
          .then((data) => data.json())
          .then((info) => {
            setColab(info);
          });
      }
      return;
    }, [colab]);

    console.log(newData);

    return (
      <div className="box">
        <div className="change-user">
          <div className="user-edit">
            <label htmlFor="">Titulo</label>
            <input
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, activity_title: value });
                }
              }}
              value={newData.activity_title}
              required
            />
          </div>
          <div className="user-edit">
            <label htmlFor="">Encargado</label>
            <select
              name="role"
              id="role"
              className="text-box"
              value={newData.activity_mandated}
              onChange={(e) => {
                setNewData({
                  ...newData,
                  mandated: parseInt(e.target.value),
                });
              }}
            >
              <option value={0}>Escoger encargado</option>
              {colab
                ? colab.map((colab) => {
                    return (
                      <option key={colab.id_user} value={colab.id_user}>
                        {colab.full_name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div className="user-edit">
            <label htmlFor="">Relevancia</label>
            <select
              name="relevance"
              id="relevance"
              className="text-box"
              value={newData.relevance}
              onChange={(e) =>
                setNewData({ ...newData, relevance: parseInt(e.target.value) })
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
          <div className="user-edit">
            <label htmlFor="">Descripcion</label>
            <textarea
              name=""
              id=""
              className="description"
              value={newData.activity_description}
              onChange={(e) => {
                const value = e.target.value;
                if (!value.startsWith(" ")) {
                  setNewData({ ...newData, activity_description: value });
                }
              }}
            ></textarea>
          </div>
          <div className="user-edit">
            <label htmlFor="">Fecha fin</label>
            <input
              type="date"
              onChange={(e) => {
                setNewData({ ...newData, date_end: e.target.value });
                required;
              }}
              value={newData.date_end}
              required
            />
          </div>
          <div className="user-edit">
            <label htmlFor="">Estado</label>
            <select
              name="relevance"
              id="relevance"
              className="text-box"
              value={newData.id_state}
              onChange={(e) =>
                setNewData({ ...newData, id_state: parseInt(e.target.value) })
              }
            >
              <option value={1}>ACTIVO</option>
              <option value={2}>PENDIENTE</option>
              <option value={3}>INACTIVO</option>
            </select>
          </div>
          <input type="button" value="Guardar" className="user-save-data" onClick={() => setActivityData()} />
          <input type="button" value="Salir" className="user-save-data" onClick={() => setActivityData()} />
        </div>
      </div>
    );
  }

  return (
    <div className="all">
      <input type="text" className="static" placeholder="Buscar" />
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
                state_description,
              },
              index
            ) => {
              return (
                <div className="user-data">
                  <div className="item">
                    <input
                      type="button"
                      className="select-user"
                      onClick={() => {
                        setActivityData([activities[index], index]);
                      }}
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
                    <p>{state_description.toUpperCase()}</p>
                  </div>
                </div>
              );
            }
          ) || <h1>Sin registros...</h1>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
      {activityData && <ChangeActivity />}
    </div>
  );
};
export default CreateActivity;
