import { useState, useEffect } from "react";
import "./index.css";
import showAlert from "./alerts";

export const URL = "http://localhost:3000/";

export const URL_WEB = "http://localhost:5173/";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });

  const logIn = JSON.parse(window.sessionStorage.getItem("user")) || null;

  const setLogIn = (data) => {
    window.sessionStorage.setItem("user", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(URL + `users/${JSON.stringify(user)}`);
      const data = await res.json();
      if (data) {
        setLogIn(JSON.stringify(data));
        window.location.href = URL_WEB + data.role_description;
      }
    } catch (err) {
      showAlert({
        title: "Usuario o contraseña incorrectos",
        text: "Intente de nuevo o pida su registro en administration@GRINF.com",
        icon: 1,
      });
    }
  };

  useEffect(() => {
    if (!logIn) {
      return;
    }
    window.location.href = URL_WEB + logIn.role_description;
  }, []);

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
        <div className="data">
          <label htmlFor="username" id="username-label">
            Usuario
          </label>
          <div className="separator">
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="data">
          <label htmlFor="password" id="password-label">
            Contraseña
          </label>
          <div className="separator">
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              required
            />
          </div>
        </div>
        <div className="actions">
          <a href="/clave">¿Olvidaste tu contraseña?</a>
          <input
            type="submit"
            className="log-in-button button"
            value="Ingresar"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
