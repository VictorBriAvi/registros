import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileAdd,
  AiOutlineRollback,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import moment from "moment";
import useColaboradoresLogic from "../../Hooks/useColaboradoresLogic";
import "../../style/Inicio.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";

const Colaboradores = () => {
  const { contextTheme } = useThemeContext();
  const { colaboradores, isLoading, deleteColaborador } =
    useColaboradoresLogic();
  console.log(colaboradores);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Colaboradores</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-colaborador/`}>
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
                className={`table table-${contextTheme} table-striped table-hover table-borderless`}
              >
                <thead>
                  <tr>
                    <th>Colaborador</th>
                    <th>Fecha Nancimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {colaboradores.map((colaborador) => (
                    <tr key={colaborador.id}>
                      <td>{colaborador.nombreCompletoEmpleado}</td>
                      <td>
                        {moment(colaborador.fechaNacimiento).format(
                          "YYYY-MM-DD"
                        )}
                      </td>

                      <td>
                        <Link
                          to={`/registros/editar-colaboradores/${colaborador.id}`}
                        >
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>

                        <button
                          className="btn btn-danger font-weight-normal "
                          onClick={() => deleteColaborador(colaborador.id)}
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

export default Colaboradores;
