import { Link } from "react-router-dom";

import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useServicioLogic from "../../Hooks/useServiciosLogic";

const Servicios = () => {
  const { servicios, isLoading, deleteServicio } = useServicioLogic();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <h1>Ventas</h1>
            <div className="">
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
          <div className="contenedor_button">
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
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
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
                  <td>{servicio.id}</td>
                  <td>{servicio.nombreCompletoEmpleado}</td>
                  <td>{servicio.nombreCompletoCliente}</td>
                  <td>{servicio.nombreTipoDePago}</td>
                  <td>{servicio.nombreServicio}</td>
                  <td>{servicio.precioProducto}</td>

                  <td>
                    <Link to={`/editar-servicio/${servicio.id}`}>
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
  );
};

export default Servicios;
