import { useState } from "react";

const AddData = () => {
  return (
      <form className="all">
        <div className="data-container">
          <div className="data-colab">
            <label htmlFor="">Reponsable</label>
            <input type="text" className="text-box" />
          </div>
          <div className="data-colab">
            <label htmlFor="">Actividad</label>
            <input type="text" className="text-box" />
          </div>
          <div className="data-colab">
            <label htmlFor="">Descripcion</label>
            <textarea name="" id="" className="text-box description"></textarea>
          </div>
          <div className="data-colab">
            <label htmlFor="">Duracion</label>
            <input type="text" className="text-box" />
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
            <input type="text" className="text-box" />
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
