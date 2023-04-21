import { useState, useEffect } from "react";
import { URL } from "../../App";

const AddData = () => {

  const [activities, setActivities] = useState(null)

  const user = () => JSON.parse(window.sessionStorage.get('user'))

  const [activity, setActivity] = useState({
    id_user: user.id_user,
    activity: '',
    description: '',
    duration: '',
    technical_deb:''
  })


  useEffect(()=>{
    if (activities == null){
      fetch(URL + 'activity')
      .then(res => res.json())
      .then(data => setActivities(data))
    }
    return 

  },[])


  return (
    <form className="all">
      <div className="data-container">
      <div className="data-colab">
          <label htmlFor="">Encargado</label>
          <select
            name="role"
            id="role"
            className="text-box"
          >
            <option value={0}>Seleccione actividad</option>
            {activities != null
              ? activities.map(({id_activity,activity_title}) => {
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
          <label htmlFor="">Descripcion</label>
          <textarea name="" id="" className="text-box description" value={activity.description} onChange={(e) => {
            const value = e.target.value;
            if (!value.startsWith(' ')){
              setActivity({...activity, description: value})
            }
            
          }}></textarea>
        </div>
        <div className="data-colab">
          <label htmlFor="">Duracion</label>
          <input type="number" className="text-box" />
          <div className="time">
            <select
              name="role"
              id="role"
              className="time-box"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value={0}>hrs</option>
              <option value={1}>dias</option>
              <option value={2}>meses</option>
            </select>
            <label htmlFor="">Tiempo</label>
          </div>
        </div>
        <div className="data-colab">
          <label htmlFor="">Deuda tecnica</label>
          <input type="number" className="text-box" />
          <div className="time">
            <select
              name="role"
              id="role"
              className="time-box"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <option value={0}>hrs</option>
              <option value={1}>dias</option>
              <option value={2}>meses</option>
            </select>
            <label htmlFor="">Tiempo</label>
          </div>
        </div>
      </div>
      <div className="send">
        <input type="submit" value="Enviar" />
      </div>
    </form>
  );
};

export default AddData;
