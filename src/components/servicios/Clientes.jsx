import {
  AiFillDelete,
  AiFillEdit,
  AiFillFileAdd,
  AiOutlineRollback,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import useClienteLogic from "../../Hooks/useClienteLogic";
import { useThemeContext } from "../../context/ThemeContext";
import "../../style/Inicio.css";
import "../../style/botones.css";

const Clientes = () => {
  const { contextTheme } = useThemeContext();
  const { clientes, isLoading, deleteCliente } = useClienteLogic();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Clientes</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-cliente/`}>
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
                    <th>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.nombreCompletoCliente}</td>

                      <td>
                        <Link to={`/registros/editar-cliente/${cliente.id}`}>
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>

                        <button
                          className="btn btn-danger font-weight-normal "
                          onClick={() => deleteCliente(cliente.id)}
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

export default Clientes;
