import { useEffect, useState } from "react";
import { URL_WEB } from "../../App";

const User = () => {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  const [logOut, setLogOut] = useState(false);

  useEffect(() => {
    if (logOut) {
      window.sessionStorage.removeItem("user");
      window.location.href = URL_WEB;
    }
  }, [logOut]);

  return (
    <div className="user-main">
      <p>{user.name}</p>
      <p>{user.area_description}</p>
      <input
        type="button"
        value="Salir"
        onClick={() => {
          setLogOut(true);
        }}
      />
    </div>
  );
};

export default User;
