import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDeServiciosLogic from "../../Hooks/useTiposDeServiciosLogic";
import "../../style/Inicio.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";

const TiposDeServicios = () => {
  const { contextTheme } = useThemeContext();

  const { tiposServicios, isLoading, deleteTipoDeServicio } =
    useTiposDeServiciosLogic();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Precios de servicios</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-tipoDeServicio/`}>
                  <button className="btn btn-primary font-weight-normal ">
                    {<AiFillFileAdd />} Agregar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/servicios"}>
                  <button className="btn btn-info font-weight-normal text-white    ">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </div>
            <div className="table-responsive">
              <table
                className={`table table-${contextTheme} table-striped table-hover table-borderless `}
              >
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Tipo de servicio</th>
                  </tr>
                </thead>
                <tbody>
                  {tiposServicios.map((tipoDeServicio) => (
                    <tr key={tipoDeServicio.id}>
                      <td>{tipoDeServicio.nombreServicio}</td>

                      <td>
                        <Link
                          to={`/registros/editar-tipoDeServicio/${tipoDeServicio.id}`}
                        >
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>
                        <button
                          onClick={() =>
                            deleteTipoDeServicio(tipoDeServicio.id)
                          }
                          className="btn btn-danger font-weight-normal "
                        >
                          {<AiFillDelete />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiposDeServicios;
