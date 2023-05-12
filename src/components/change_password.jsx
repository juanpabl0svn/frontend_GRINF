import { useState } from "react";
import { URL, URL_WEB } from "../App";
import showAlert from "../alerts";

export default function ChangePassword() {
  const [data, setData] = useState({
    username: "",
    password: "",
    new_password: "",
  });

  const setPassword = async (e) => {
    e.preventDefault();

    const dataString = JSON.stringify(data);

    if (data.password === data.new_password) {
      const req = await fetch(URL + `password/${dataString}`, { method: "POST" });
      if (req.ok) {
        showAlert({
          title:'Contraseña correctamente guardad',
          text: `Su nueva contraseña es ${data.password}`,
          icon: 0
        })
        setTimeout(async () => {
          const res = await req.json();
          const user = JSON.stringify(res);
          window.sessionStorage.setItem("user", user);
          window.location.href = `${URL_WEB + res.role_description}`
        },1800)
      } else {
        showAlert({
          title: 'Upss!!',
          text: 'Algo salio mal!',
          icon: 1
        })
      }
      return;
    }
    showAlert({
          title: 'Upss!!',
          text: 'Contraseñas no coinciden',
          icon: 1
        })
  };

  return (
    <div className="card">
      <form className="form" onSubmit={(e) => setPassword(e)}>
        <div className="data">
          <label htmlFor="username" id="username-label">
            Usuario
          </label>
          <div className="separator">
            <input
              type="text"
              name="username"
              id="username"
              value={data.username}
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="data">
          <label htmlFor="password" id="password-label">
            Nueva contraseña
          </label>
          <div className="separator">
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>
        <div className="data">
          <label htmlFor="new_password" id="password-label">
            Repetir contraseña
          </label>
          <div className="separator">
            <input
              type="password"
              name="new_password"
              id="new_password"
              value={data.new_password}
              onChange={(e) =>
                setData({ ...data, new_password: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="actions">
          <label>
            <a href="/">Volver</a>
          </label>
          <input type="submit" value="Cambiar" className="log-in-button button" />
        </div>
      </form>
    </div>
  );
}
