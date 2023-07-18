import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";

const TiposDePago = () => {
  const { tiposDePago, isLoading, deleteTipoDePago } = useTiposDePagoLogic();

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div>
            <h1>Tipos de pago</h1>
          </div>

          <hr />
          <div className="contenedor_button">
            <div className="container my-2">
              <Link to={`/registros/crear-tipoDePago/`}>
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
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Tipo de pago</th>
              </tr>
            </thead>
            <tbody>
              {tiposDePago.map((tipoDePago) => (
                <tr key={tipoDePago.id}>
                  <td>{tipoDePago.id}</td>
                  <td>{tipoDePago.nombreTipoDePago}</td>

                  <td>
                    <Link to={`/registros/editar-tipoDePago/${tipoDePago.id}`}>
                      <button className="btn btn-primary font-weight-normal me-3">
                        {<AiFillEdit />}
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteTipoDePago(tipoDePago.id)}
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

export default TiposDePago;
