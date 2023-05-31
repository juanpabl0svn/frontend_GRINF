import { useState, useEffect } from "react";
import { URL } from "../../App";
import showAlert from "../../alerts";

const AddData = () => {
  const [activities, setActivities] = useState(null);

  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const [activity, setActivity] = useState({
    id_user: user.id_user,
    id_activity: 0,
    description: "",
    actual_date: new Date().toJSON().slice(0, 10).replace("/-/g", "/"),
    time_worked: 0,
    paid_time: 0,
  });

  useEffect(() => {
    if (!activities) {
      const userString = JSON.stringify(user);
      fetch(URL + `activity/${userString}`)
        .then((res) => res.json())
        .then((data) => {
          setActivities(data);
        });
    }
    return;
  }, []);

  const setWhiteValues = () => {
    setActivity({
      id_user: user.id_user,
      id_activity: 0,
      description: "",
      actual_date: new Date().toJSON().slice(0, 10).replace("/-/g", "/"),
      time_worked: 0,
      paid_time: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activity.id_activity === 0) {
      showAlert({
        title: "Ups!!!",
        text: "Ingrese la actividad a la que desea agregar subactividad",
        icon: 1,
      });
      return;
    }

    const activity_string = JSON.stringify(activity);
    const req = await fetch(URL + `subactivity/${activity_string}`, {
      method: "POST",
    });
    if (req.ok) {
      showAlert({
        title: "Actividad subida correctamente",
        text: "Todo salio bien",
        icon: 0,
      });

      setWhiteValues();
      return;
    }
    showAlert({
      title: "Ups!!",
      text: "Algo salio mal",
      icon: 1,
    });
  };

  return (
    <form className="all" onSubmit={handleSubmit}>
      <div className="data-container">
        <div className="data-colab">
          <label htmlFor="">Actividad</label>
          <select
            name="role"
            id="role"
            className="text-box"
            value={activity.id_activity}
            onChange={(e) =>
              setActivity({
                ...activity,
                id_activity: parseInt(e.target.value),
              })
            }
          >
            <option value={0}>Seleccione actividad</option>
            {activities != null
              ? activities.map(({ id_activity, activity_title }) => {
                  return (
                    <option key={id_activity} value={id_activity}>
                      {activity_title}
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
            className="text-box description form-user"
            value={activity.description}
            onChange={(e) => {
              const value = e.target.value;
              if (!value.startsWith(" ")) {
                console.log(activity);
                setActivity({ ...activity, description: value });
              }
            }}
            required
          ></textarea>
        </div>

        <div className="data-colab">
          <label htmlFor="">Tiempo trabajado</label>
          <input
            type="number"
            className="text-box"
            min={0}
            max={60 * 24}
            value={activity.time_worked}
            onChange={(e) =>
              setActivity({
                ...activity,
                time_worked: parseInt(e.target.value),
              })
            }
            required
          />
          <div className="time">
            <label htmlFor="">Minutos</label>
          </div>
        </div>
        <div className="data-colab">
          <label htmlFor="">Tiempo pagado</label>
          <input
            type="number"
            className="text-box"
            value={activity.paid_time}
            onChange={(e) =>
              setActivity({ ...activity, paid_time: parseInt(e.target.value) })
            }
            min={0}
            max={activity.time_worked}
            required
          />
          <div className="time">
            <label htmlFor="">Minutos</label>
          </div>
        </div>
      </div>
      <div className="send">
        <input type="submit" value="Enviar" className="log-in-button button" />
      </div>
    </form>
  );
};

export default AddData;
