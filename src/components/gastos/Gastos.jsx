import { Link } from "react-router-dom";

import { AiFillDelete, AiFillEdit, AiFillFileAdd } from "react-icons/ai";

import { AiOutlineRollback } from "react-icons/ai";
import useGastosLogic from "../../Hooks/useGastosLogic";

import DatePicker from "react-datepicker";
import DataTable from "../components/dataTable";
import { Button, Col, Container, Row } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";
import BotonesPrincipalesAgregar from "../components/BotonesPrincipalesAgregar";
import { FcSearch } from "react-icons/fc";

const Cierres = () => {
  const {
    gastos,
    isLoadingGasto,
    deleteGasto,
    paginaSiguiente,
    paginaAnterior,
    getGastos,
  } = useGastosLogic();
  const [fechaActual, setFechaActual] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const columnaServicio = [
    { key: "nombreTipoDeGasto", label: "Tipo de gasto" },
    { key: "descripcionGasto", label: "Descripcion" },
    { key: "precioGasto", label: "Valor Gasto" },
    { key: "fechaGasto", label: "Fecha del gasto" },
  ];

  const handleBuscarPorFecha = (e) => {
    e.preventDefault();
    const fecha = moment(fechaSeleccionada).format("YYYY-MM-DD");
    getGastos(fecha);
  };

  useEffect(() => {
    // Obtiene la fecha actual y la formatea
    const fechaActualFormateada = moment().format("DD MMMM, YYYY");
    setFechaActual(fechaActualFormateada);
  }, []);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
  };

  if (isLoadingGasto) {
    return <p>Cargando...</p>;
  }
  return (
    <div>
      <div>
        <div>
          <div>
            <div className="boton_servicios">
              <h1 className="text-center">Gastos</h1>
              <div>
                <Link to={"/registros/gastos/TiposDeGastos"}>
                  <button className="btn btn-outline-primary me-3 float-end">
                    Tipos de gastos
                  </button>
                </Link>
              </div>
            </div>

            <hr />

            <Container>
              <Row>
                <Col sm={6} className="my-2">
                  <BotonesPrincipalesAgregar
                    agregar={`/registros/crear-tipoDeGasto`}
                    regresar={`/registros/`}
                    tituloBoton={"Agregar nueva gasto"}
                  />
                </Col>

                <Col sm={6}>
                  <div className="contenedor_filtro_fechas">
                    <h3>Buscar por fecha:</h3>
                    <DatePicker
                      selected={fechaSeleccionada}
                      onChange={handleDateChange}
                      placeholderText="¿ Que fecha buscamos?"
                      dateFormat="dd/MM/yyyy"
                      className="custom-datepicker" // Agrega una clase personalizada
                    />

                    <Button
                      className="mt-3 boton_buscar"
                      onClick={(e) => handleBuscarPorFecha(e)}
                    >
                      <FcSearch /> Buscar fecha
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>

            <div className="table-responsive ">
              <h4 className="text-center my-5">Fecha actual: {fechaActual}</h4>
              <DataTable
                columnaServicio={columnaServicio}
                data={gastos}
                deleteData={deleteGasto}
                paginaSiguiente={paginaSiguiente}
                paginaAnterior={paginaAnterior}
                editUrl="/registros/gastos/editar-gasto"
              />
              {/**
              <table className="table table-striped table-hover table-borderless ">
                <thead>
                  <tr>
                    <th>Tipo de gasto</th>
                    <th>Descripcion </th>
                    <th>Valor Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {gastos.map((gasto) => (
                    <tr key={gasto.id}>
                      <td>{gasto.nombreTipoDeGasto}</td>
                      <td>{gasto.descripcionGasto}</td>
                      <td>{gasto.precioGasto}</td>

                      <td>
                        <Link to={`/registros/gastos/editar-gasto/${gasto.id}`}>
                          <button className="btn btn-primary font-weight-normal me-3">
                            {<AiFillEdit />}
                          </button>
                        </Link>

                        <button
                          onClick={() => deleteGasto(gasto.id)}
                          className="btn btn-danger font-weight-normal "
                        >
                          {<AiFillDelete />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
               */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cierres;
