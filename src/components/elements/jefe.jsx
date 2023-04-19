import { useState } from "react";

const CreateActivity = () => {
  return (
    <form className="all">
      <div className="data-container">
        <div className="data-colab">
          <label htmlFor="">Titulo</label>
          <input type="text" className="text-box" />
        </div>
        <div className="data-colab">
          <label htmlFor="">Encargado</label>
          <input type="text" className="text-box" />
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
            onChange={(e) => setData({ ...data, role: e.target.value })}
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
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>hrs</option>
            <option value={1}>dias</option>
            <option value={2}>eses</option>
          </select>
        </div>
        <div className="data-colab">
          <label htmlFor="">Area</label>
          <select
            name="role"
            id="role"
            className="text-box"
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <option value={0}>hrs</option>
            <option value={1}>dias</option>
            <option value={2}>eses</option>
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
      </div>
      
      <div className="send">
        <input type="submit" value="Enviar" />
      </div>
    </form>
  );
};

export const GetActivities = () => {
  return <h1>Hola</h1>;
};
export default CreateActivity;
