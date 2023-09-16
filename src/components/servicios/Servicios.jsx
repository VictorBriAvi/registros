import { Link } from "react-router-dom";

import { AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useServicioLogic from "../../Hooks/useServiciosLogic";
import { useThemeContext } from "../../context/ThemeContext";
import "../../style/Inicio.css";
import "../../style/botones.css";
import DataTable from "../components/dataTable";
import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos CSS
import { Button } from "react-bootstrap";
import "../../style/Servicios.css";

const Servicios = () => {
  const {
    servicios,
    isLoading,
    deleteServicio,
    paginaSiguiente,
    paginaAnterior,
    getServiciosForDate,
    getServicios,
  } = useServicioLogic();
  const { contextTheme } = useThemeContext();
  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const columnaServicio = [
    { key: "nombreCompletoEmpleado", label: "Colaborador" },
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "nombreTipoDePago", label: "Tipo de pago" },
    { key: "nombreServicio", label: "Servicio" },
    { key: "precioProducto", label: "Precio" },
    { key: "fechaServicio", label: "Fecha" },
  ];

  console.log(servicios);
  /*
  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    // Aquí puedes usar la variable 'fechaSeleccionada' para realizar la acción deseada
    if (fechaSeleccionada) {
      const fechaFormateada = moment(fechaSeleccionada).format("DD/MM/YYYY");

      getServiciosForDate(fechaFormateada);
      // Realiza aquí lo que necesites con la fecha seleccionada
    } else {
      // Maneja el caso donde no se ha seleccionado ninguna fecha
      console.log("Ninguna fecha seleccionada");
      getServicios();
    }
  };
  */

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

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

            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>
                Filtra por fecha
                <DatePicker
                  selected={fechaSeleccionada}
                  onChange={handleDateChange}
                  placeholderText="¿ Que fecha buscamos?"
                  dateFormat="dd/MM/yyyy"
                  className="custom-datepicker" // Agrega una clase personalizada
                />
                {/**          <Button onClick={(e) => handleBuscarPorFecha(e)}>
                  Buscar fecha
                </Button> */}
              </h3>
            </div>
            <div>
              <h4>Fecha actual: {fechaActual}</h4>
              {/* Aquí puedes renderizar tu DataTable con la fecha actual */}
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
    </div>
  );
};

export default Servicios;
