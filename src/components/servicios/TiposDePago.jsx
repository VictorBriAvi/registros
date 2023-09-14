import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

import { AiOutlineRollback } from "react-icons/ai";
import useTiposDePagoLogic from "../../Hooks/useTiposDePago";
import "../../style/productos.css";
import "../../style/botones.css";
import { useThemeContext } from "../../context/ThemeContext";
import DataTable from "../components/dataTable";

const TiposDePago = () => {
  const { contextTheme } = useThemeContext();
  const {
    tiposDePago,
    isLoading,
    deleteTipoDePago,
    paginaAnterior,
    paginaSiguiente,
  } = useTiposDePagoLogic();

  const columnaServicio = [{ key: "nombreTipoDePago", label: "Tipo De Pago" }];

  if (isLoading) {
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
            <DataTable
              columnaServicio={columnaServicio}
              data={tiposDePago}
              deleteData={deleteTipoDePago}
              paginaSiguiente={paginaSiguiente}
              paginaAnterior={paginaAnterior}
              editUrl="/registros/editar-tipoDePago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiposDePago;
