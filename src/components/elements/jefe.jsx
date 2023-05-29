import { useEffect, useState, useRef, useCallback } from "react";
import { URL } from "../../App";
import showAlert from "../../alerts";
import debounce from "just-debounce-it";

const CreateActivity = () => {
  const { id_area } = JSON.parse(window.sessionStorage.getItem("user"));

  const [activity, setActivity] = useState({
    title: "",
    mandated: 0,
    description: "",
    relevance: 0,
    date_start: "",
    date_end: "",
    id_area,
  });

  const setWhiteValues = () => {
    setActivity({
      title: "",
      mandated: 0,
      description: "",
      relevance: 0,
      date_start: "",
      date_end: "",
      id_area,
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
          setUsers(info);
        });
    }
    return;
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activity.mandated != 0 && activity.relevance != 0) {
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
        showAlert({
          title: "Actividad creada",
          text: "Ahora esta disponible para el ingreso de datos",
          icon: 0,
        });
        setWhiteValues();
      } else {
        showAlert({
          title: "Ups!!!",
          text: "Algo salio mal al crear la actividad",
          icon: 1,
        });
      }
      return;
    }
    showAlert({
      title: "Diligencie todo el formulario",
      text: "Hay campos vacios o sin valor en el formulario",
      icon: 2,
    });
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
          <label htmlFor="description">Descripcion</label>
          <textarea
            name="description"
            id="description"
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
          <label htmlFor="relevance">Relevancia</label>
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
          <label htmlFor="date">Inicio</label>
          <input
            id="date"
            name="date"
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
          <label htmlFor="date-end">Fin</label>
          <input
            id="date-end"
            name="date-end"
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
        <input type="submit" className="log-in-button button" value="Enviar" />
      </div>
    </form>
  );
};

export const GetActivities = () => {
  const [activities, setActivities] = useState();

  const [filter, setFilter] = useState("");

  const { id_area } = JSON.parse(window.sessionStorage.getItem("user"));

  const [activityData, setActivityData] = useState();

  const data = {
    id_area: id_area,
    filter: filter,
  };
  const lastCall = useRef("");

  const handleSearchArea = useCallback(
    debounce(() => {
      const new_data = JSON.stringify(data);
      fetch(
        URL +
          `activity/area${filter != "" ? `/filter/${new_data}` : `/${id_area}`}`
      )
        .then((data) => data.json())
        .then((info) => setActivities(info));
      return;
    }, 1),
    [filter]
  );

  useEffect(() => {
    if (!activities || (filter != "" && filter != lastCall.current)) {
      handleSearchArea();
      lastCall.current = filter;
      return;
    }
    if (filter == "" && lastCall.current != filter) {
      handleSearchArea();
      lastCall.current = filter;
      return;
    }
    return;
  }, [activities, filter]);

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

    return (
      <div className="box">
        <div className="change-user">
          <div className="user-edit">
            <label htmlFor="title">Titulo</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-user"
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
            <label htmlFor="mandated">Encargado</label>
            <select
              name="mandated"
              id="mandated"
              className="form-user"
              value={newData.activity_mandated}
              onChange={(e) => {
                setNewData({
                  ...newData,
                  activity_mandated: parseInt(e.target.value),
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
            <label htmlFor="relevance">Relevancia</label>
            <select
              name="relevance"
              id="relevance"
              className="form-user"
              value={newData.relevance}
              onChange={(e) =>
                setNewData({ ...newData, relevance: parseInt(e.target.value) })
              }
            >
              <option value={0}>Ingrese la relevancia</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="user-edit">
            <label htmlFor="description">Descripcion</label>
            <textarea
              name="description"
              id="description"
              className="description form-user"
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
            <label htmlFor="date">Fecha fin</label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-user"
              onChange={(e) => {
                setNewData({ ...newData, date_end: e.target.value });
                required;
              }}
              value={newData.date_end}
              required
            />
          </div>
          <div className="user-edit">
            <label htmlFor="state">Estado</label>
            <select
              name="state"
              id="state"
              className="form-user"
              value={newData.id_state}
              onChange={(e) =>
                setNewData({ ...newData, id_state: parseInt(e.target.value) })
              }
            >
              <option value={1}>ACTIVO</option>
              <option value={2}>INACTIVO</option>
              <option value={3}>PENDIENTE</option>
            </select>
          </div>
          <input
            type="button"
            value="Guardar"
            className="user-save-data button"
            onClick={async () => {
              setNewData({
                ...newData,
                date_end: newData.date_end.split("-").join("/"),
              });

              const newDataString = JSON.stringify(newData);

              const req = await fetch(URL + `activity/${newDataString}`, {
                method: "PUT",
              });
              if (req.ok) {
                showAlert({
                  title: "Actividad modificada con exito",
                  text: "Ahora sus cambios se pueden evidenciar",
                  icon: 0,
                });
                setActivityData();
                setActivities();
              } else {
                showAlert({
                  title: "Ups!!!",
                  text: "Algo salio mal al modificar la actividad",
                  icon: 1,
                });
              }
            }}
          />
          <input
            type="button"
            value="Salir"
            className="user-save-data button"
            onClick={() => setActivityData()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="all">
      <input
        type="text"
        className="static"
        placeholder="Buscar"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
        {activities ? (
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
                <div className="user-data" key={index}>
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
                    <p>{state_description}</p>
                  </div>
                </div>
              );
            }
          )
        ) : (
          <h1 className="center-text">Cargando...</h1>
        )}
        {Array.isArray(activities) && activities.length === 0 && (
          <h1 className="center-text">Sin registros</h1>
        )}
        {activityData && <ChangeActivity />}
      </div>
    </div>
  );
};
export default CreateActivity;
