import { Link } from "react-router-dom";

import { AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { useThemeContext } from "../../context/ThemeContext";
import "../../style/Inicio.css";
import "../../style/botones.css";
import DataTable from "../components/dataTable";

const Servicios = () => {
  const {
    servicios,
    isLoading,
    deleteServicio,
    paginaSiguiente,
    paginaAnterior,
  } = useServicioLogic();
  const { contextTheme } = useThemeContext();

  const columnaServicio = [
    { key: "nombreCompletoEmpleado", label: "Colaborador" },
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "nombreTipoDePago", label: "Tipo de pago" },
    { key: "nombreServicio", label: "Servicio" },
    { key: "precioProducto", label: "Precio" },
  ];

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
              <DataTable
                columnaServicio={columnaServicio}
                data={servicios}
                deleteData={deleteServicio}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/editar-servicio"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
