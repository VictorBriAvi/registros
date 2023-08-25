import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";

import "../../style/productos.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";
import useTiposDeGastosLogic from "../../Hooks/useTiposDeGastosLogic";
const TiposDeGastos = () => {
  const { contextTheme } = useThemeContext();
  const { tiposDeGastos, isLoadingGasto, deleteTipoDeGasto } =
    useTiposDeGastosLogic();

  if (isLoadingGasto) {
    return <p>Cargando...</p>;
  }
  return (
    <div className={`${contextTheme} contenedor`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div>
              <h1>Tipos de pago</h1>
            </div>

            <hr />
            <div className="boton">
              <div className="container my-2">
                <Link
                  to={`/registros/gastos/TiposDeGastos/Agregar-TipoDeGasto`}
                >
                  <button className="btn btn-primary font-weight-normal ">
                    {<AiFillFileAdd />} Agregar
                  </button>
                </Link>
              </div>
              <div className="container my-2">
                <Link to={"/registros/gastos"}>
                  <button className="btn btn-info font-weight-normal text-white    ">
                    {<AiOutlineRollback />} Regresar
                  </button>
                </Link>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Tipo de gasto</th>
                </tr>
              </thead>
              <tbody>
                {tiposDeGastos.map((tipoDeGasto) => (
                  <tr key={tipoDeGasto.id}>
                    <td>{tipoDeGasto.nombreTipoDeGasto}</td>

                    <td>
                      <Link
                        to={`/registros/gastos/TiposDeGastos/editar-tipoDeGasto/${tipoDeGasto.id}`}
                      >
                        <button className="btn btn-primary font-weight-normal me-3">
                          {<AiFillEdit />}
                        </button>
                      </Link>

                      <button
                        onClick={() => deleteTipoDeGasto(tipoDeGasto.id)}
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
  );
};

export default TiposDeGastos;
