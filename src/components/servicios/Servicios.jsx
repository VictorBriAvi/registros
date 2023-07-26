import { Link } from "react-router-dom";

import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { useThemeContext } from "../../context/ThemeContext";
import "../../style/Inicio.css";
import "../../style/botones.css";

const Servicios = () => {
  const { servicios, isLoading, deleteServicio } = useServicioLogic();
  const { contextTheme } = useThemeContext();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container" id={contextTheme}>
        <div className="row">
          <div className="col-md-12">
            <div className="boton_servicios">
              <h1>Ventas</h1>
              <div>
                <Link to={"/registros/colaboradores"}>
                  <button className="btn btn-outline-primary me-3">
                    Colaboradores
                  </button>
                </Link>

                <Link to={"/registros/clientes"}>
                  <button className="btn btn-outline-primary me-3">
                    Clientes
                  </button>
                </Link>

                <Link to={"/registros/tiposDeServicios"}>
                  <button className="btn btn-outline-primary me-3">
                    Servicios
                  </button>
                </Link>

                <Link to={"/registros/tiposDePago"}>
                  <button className="btn btn-outline-primary me-3">
                    Tipos de pago
                  </button>
                </Link>
              </div>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link to={`/registros/crear-servicio/`}>
                  <button className="btn btn-primary font-weight-normal ">
                    {<AiFillFileAdd />} Agregar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/"}>
                  <button className="btn btn-info font-weight-normal text-white    ">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-borderless ">
                <thead>
                  <tr>
                    <th>Colaborador</th>
                    <th>Cliente</th>
                    <th>Tipo de pago</th>
                    <th>Servicio</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.map((servicio) => (
                    <tr key={servicio.id}>
                      <td>{servicio.nombreCompletoEmpleado}</td>
                      <td>{servicio.nombreCompletoCliente}</td>
                      <td>{servicio.nombreTipoDePago}</td>
                      <td>{servicio.nombreServicio}</td>
                      <td>{servicio.precioProducto}</td>

                      <td>
                        <Link to={`/registros/editar-servicio/${servicio.id}`}>
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteServicio(servicio.id)}
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

export default Servicios;
