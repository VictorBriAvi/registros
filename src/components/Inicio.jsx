import { Link } from "react-router-dom";
import "../style/Inicio.css";
import ReactSwitch from "react-switch";
import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import "../style/Inicio.css";

const Inicio = () => {
  const [checked, setChecked] = useState(false);
  const { contextTheme, setContextTheme } = useThemeContext();

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "light" ? "dark" : "light"));
    setChecked(nextChecked);
    console.log(nextChecked);
    console.log(contextTheme);
  };
  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container ">
        <ReactSwitch
          onChange={handleSwitch}
          checked={checked}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />

        <h1>Inicio de programa {contextTheme} </h1>
        <hr />
        <Link to={"/registros/productos"}>
          <button className="btn btn-outline-primary">Stock</button>
        </Link>
        <Link to={"/registros/servicios"}>
          <button className="btn btn-outline-primary">Servicios</button>
        </Link>

        <Link to={"/registros/gastos"}>
          <button className="btn btn-outline-primary">Gastos</button>
        </Link>
        <Link to={"/registros/arqueo-de-caja"}>
          <button className="btn btn-outline-primary">Arqueo de caja</button>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
