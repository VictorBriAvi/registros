import { Link, useNavigate } from "react-router-dom";
import { FcAddDatabase } from "react-icons/fc";
import { AiOutlineRollback } from "react-icons/ai";

const BotonesPrincipalesAgregar = ({ agregar, regresar, tituloBoton }) => {
  return (
    <div className="contenedor_botones_superiores">
      <div className="container_boton ">
        <Link to={agregar}>
          <button className="fondo_boton agregar">
            {<FcAddDatabase />} {tituloBoton}
          </button>
        </Link>
        <Link to={regresar}>
          <button className="fondo_boton regresar">
            {<AiOutlineRollback />} Regresar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BotonesPrincipalesAgregar;
