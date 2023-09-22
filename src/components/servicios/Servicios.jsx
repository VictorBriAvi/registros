import { Link } from "react-router-dom";

import { AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useServicioLogic from "../../Hooks/useServiciosLogic";

import DataTable from "../components/dataTable";
import { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importa los estilos CSS
import { Button, Container } from "react-bootstrap";

const Servicios = () => {
  const {
    servicios,
    isLoading,
    deleteServicio,
    paginaSiguiente,
    paginaAnterior,

    getServicios,
  } = useServicioLogic();

  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const columnaServicio = [
    { key: "nombreCompletoEmpleado", label: "Colaborador" },
    { key: "nombreCompletoCliente", label: "Cliente" },
    { key: "nombreTipoDePago", label: "Tipo de pago" },
    { key: "nombreServicio", label: "Servicio" },
    { key: "precioProducto", label: "Precio Descuento" },
    { key: "fechaServicio", label: "Fecha" },
  ];

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fecha = moment(fechaSeleccionada).format("YYYY-MM-DD");
    getServicios(fecha);
  };

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  return (
    <Container>
      <div>
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
            <div>
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
              <h3>Filtra por fecha</h3>
              <DatePicker
                selected={fechaSeleccionada}
                onChange={handleDateChange}
                placeholderText="¿ Que fecha buscamos?"
                dateFormat="dd/MM/yyyy"
                className="custom-datepicker" // Agrega una clase personalizada
              />
              <Button onClick={(e) => handleBuscarPorFecha(e)}>
                Buscar fecha
              </Button>
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
    </Container>
  );
};

export default Servicios;
