import { useState } from "react";
import { URL, URL_WEB } from "../App";

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
      const req = await fetch(URL + `password/${dataString}`, { method: "PUT" });
      if (req.status === 200) {
        alert(
          `Contraseña correctamente guardada, su nueva contraseña es ${data.password}`
        );
        const res = await req.json();
        const user = JSON.stringify(res);
        window.sessionStorage.setItem("user", user);
        window.location.href = `${URL_WEB + res.role_description}`;
      } else {
        alert("Error !!");
      }
      return;
    }
    alert("Contraseñas no coinciden");
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
                console.log(data);
              }}
            />
          </div>
        </div>
        <div className="data">
          <label htmlFor="password" id="password-label">
            Nueva contraseña
          </label>
          <div className="separator">
            <input
              type="text"
              name="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
        </div>
        <div className="data">
          <label htmlFor="password" id="password-label">
            Repetir contraseña
          </label>
          <div className="separator">
            <input
              type="text"
              name="new_password"
              id="new_password"
              value={data.new_password}
              onChange={(e) =>
                setData({ ...data, new_password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="actions">
          <label>
            <a href="/">Volver</a>
          </label>
          <input type="submit" value="Cambiar" className="log-in-button" />
        </div>
      </form>
    </div>
  );
}
